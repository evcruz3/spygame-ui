import React, { useEffect, useRef, useState } from 'react';
import { Client, Message, TypedArray } from 'paho-mqtt';
import { $GameEventDocument, APIClient, ApiError, GameEventDocument, OpenAPI, ParticipantStatusEnum, PlayerDocument, PlayerRoleEnum, TaskDocument, TaskStatusEnum, TaskTypeEnum } from '../client';
import Button from '../components/Button';
import CountDown from '../components/CountDown';
import { TaskIsOngoingView } from '../views/TaskIsOngoing';
import { TaskIsWaitingForParticipantsView } from '../views/TaskIsWaitingForParticipants';
import Modal from "react-modal";
import { MQTT_BASE } from '../main';

const MessageModal = ({ content, isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className='flex text-center flex-col items-center justify-between h-full'>
        <div className="flex-basis-10">
          <h3 className="">{content.title}</h3>
        </div>
        <div className="flex-basis-80 text-3xl text-red-600">
          <p>{content.body}</p>
        </div>
        <div className="flex-basis-10">
          <Button purpose={"primary"} onClick={onClose}>OK</Button>
        </div>
      </div>
    </Modal>
  );
};

type MessageContent = {
  title: string;
  body: string;
};

// import { useTransition, animated } from 'react-spring';


// /events/{event_code}                                       - event announcements + EventDocument
// /events/{event_code}/players/{player_id}/life              - announcement for particular player's health + PlayerDocument
// /events/{event_code}/players/{player_id}/task              - announcement for particular player's task + TaskDocument
// /events/{event_code}/players/{player_id}/role              - announcement about role of player + PlayerDocument
// /events/{event_code}/tasks/{task_id}/participants          - announcement when a player joins the task + TaskDocument  
// /events/{event_code}/tasks/{task_id}/state                 - announcement about the task's state + TaskDocument

type MQTTComponentProps = {
  event_id: string,
  player_id: string,
}

function MQTTComponent(props: MQTTComponentProps) {
  const apiClient = new APIClient(OpenAPI);

  const subscribedTopics = useRef<Set<string>>(new Set());
  // const [messages, setMessages] = useState<Array<Message>>(new Array());
  // const prefix = '/events/' + props.event_id
  const eventPrefix = '/events/' + props.event_id
  const playerPrefix = eventPrefix + '/players/' + props.player_id
  const taskPrefix = eventPrefix + '/tasks'
  const topics = [`${eventPrefix}`, `${playerPrefix}/life`, `${playerPrefix}/role`, `${taskPrefix}`]
  const [myCurrentTask, setMyCurrentTask] = useState<TaskDocument | null>()
  const [currentProfile, setCurrentProfile] = useState<PlayerDocument>()
  const [currentEvent, setCurrentEvent] = useState<GameEventDocument>()
  const [participationStatus, setParticipationStatus] = useState<ParticipantStatusEnum | null>()
  const taskTimeStamp = useRef<Date>(new Date())
  const profileTimeStamp = useRef<Date>(new Date())
  const [messageContent, setMessageContent] = useState<MessageContent>({
    title: "",
    body: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  // `

  const destroyFunc = useRef<void>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);
  const client = new Client(MQTT_BASE, 9001, '', 'client-id-' + Math.random());

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  // Ensure that upload of sequences with no seqid are only done ONCE
  var connectOnce = () => {
    apiClient.events.getEventPlayerInfoEventsEventCodePlayersPlayerIdGet(props.event_id, props.player_id)
    .then((data) => {setCurrentProfile(data)
      profileTimeStamp.current = new Date()
    })
    .catch((error) => console.log("error fetching profile: ", error))

    apiClient.events.getCurrentTaskOfPlayerEventsEventCodePlayersPlayerIdCurrentTaskGet(props.event_id, props.player_id)
    .then((task) => {
      setMyCurrentTask(task)
      console.log("current task gotten from api: ", task)
      const participant = task?.participants?.find((value) => typeof value.player === "string" ? value.player == props.player_id 
              : value.player._id == props.player_id)
      setParticipationStatus(participant?.status)
      taskTimeStamp.current = new Date()
    })

    const onMessageArrived = (message: Message) => {
      // const messageData = message.payloadString;
      const payloadObject = JSON.parse(message.payloadString)
      console.log("got document from ", message.destinationName)
      console.log(payloadObject)
    
      if ("task_document" in payloadObject){
        // console.log("isTaskDocument")
        const timeStamp = new Date(Date.UTC(
          Number(payloadObject.timestamp!.substring(0, 4)),
          Number(payloadObject.timestamp!.substring(5, 7)) - 1,
          Number(payloadObject.timestamp!.substring(8, 10)),
          Number(payloadObject.timestamp!.substring(11, 13)),
          Number(payloadObject.timestamp!.substring(14, 16)),
          Number(payloadObject.timestamp!.substring(17, 19))))
        console.log(timeStamp, " vs ", taskTimeStamp.current)
        
        if (timeStamp >= taskTimeStamp.current){
          const task = payloadObject.task_document as TaskDocument
          const participant = task.participants.find((value) => typeof value.player === "string" ? value.player == props.player_id 
              : value.player._id == props.player_id)
          if (participant != null){
            
            setMyCurrentTask(payloadObject.task_document as TaskDocument)
            setParticipationStatus(participant.status)
            taskTimeStamp.current = new Date(Date.UTC(
              Number(payloadObject.timestamp!.substring(0, 4)),
              Number(payloadObject.timestamp!.substring(5, 7)) - 1,
              Number(payloadObject.timestamp!.substring(8, 10)),
              Number(payloadObject.timestamp!.substring(11, 13)),
              Number(payloadObject.timestamp!.substring(14, 16)),
              Number(payloadObject.timestamp!.substring(17, 19))))

            const topic = `${taskPrefix}/${task.task_code}/participants`
            if(participant.status != ParticipantStatusEnum.NOT_JOINED){
              if(task.status == TaskStatusEnum.FINISHED){
                console.log("Unsubscribing to topic: ", topic)
                if (subscribedTopics.current.has(topic)) {
                  client.unsubscribe(`${topic}`);
                  // const result = subscribedTopics.delete(topic)
                  const result = subscribedTopics.current.delete(topic)
                  if(result == true)
                    console.log(`Unsubscribed to ${topic}`)
                    // subscribedTopics.current.add(topic)
                    // setSubscribedTopics((prevTopics) => new Set(subscribedTopics) );
                }
                setMyCurrentTask(null)
                setParticipationStatus(null)
                taskTimeStamp.current = new Date(Date.UTC(
                  Number(payloadObject.timestamp!.substring(0, 4)),
                  Number(payloadObject.timestamp!.substring(5, 7)) - 1,
                  Number(payloadObject.timestamp!.substring(8, 10)),
                  Number(payloadObject.timestamp!.substring(11, 13)),
                  Number(payloadObject.timestamp!.substring(14, 16)),
                  Number(payloadObject.timestamp!.substring(17, 19))))
              }
              else
                if (!subscribedTopics.current.has(topic)) {
                  client.subscribe(`${topic}`, { qos: 2 });
                  console.log(`Subscribed to ${topic}`)
                  subscribedTopics.current.add(topic)
                  // setSubscribedTopics((prevTopics) => new Set(prevTopics).add(topic));
                }
            }
            else {
              setMyCurrentTask(null)
              setParticipationStatus(null)
              taskTimeStamp.current = new Date(Date.UTC(
                Number(payloadObject.timestamp!.substring(0, 4)),
                Number(payloadObject.timestamp!.substring(5, 7)) - 1,
                Number(payloadObject.timestamp!.substring(8, 10)),
                Number(payloadObject.timestamp!.substring(11, 13)),
                Number(payloadObject.timestamp!.substring(14, 16)),
                Number(payloadObject.timestamp!.substring(17, 19))))
            }
     
          }
        }
        
      }
      else if ("player_document" in payloadObject){
        // console.log("isPlayerDocument")
        if(payloadObject.player_document._id == props.player_id){
          const timeStamp = new Date(Date.UTC(
            Number(payloadObject.timestamp!.substring(0, 4)),
            Number(payloadObject.timestamp!.substring(5, 7)) - 1,
            Number(payloadObject.timestamp!.substring(8, 10)),
            Number(payloadObject.timestamp!.substring(11, 13)),
            Number(payloadObject.timestamp!.substring(14, 16)),
            Number(payloadObject.timestamp!.substring(17, 19))))
          
          if (timeStamp >= profileTimeStamp.current){
        
            setCurrentProfile(payloadObject.player_document as PlayerDocument)
            setMessageContent({
              title: "Life Update",
              body: payloadObject.message,
            });
            setModalOpen(true);
          }
        }
      }
      else if ("event_document" in payloadObject){
        // console.log("isEventDocument")
        setCurrentEvent(payloadObject.event_document as GameEventDocument)
      } 
      else {
        console.log(`unknown document type`)
        console.log(payloadObject)
      }
      // messages.unshift(message)
      // setMessages(messages);
    };

    

    const client_params = {
      onSuccess: () => {
        console.log("Successfully connected to mqtt broker")
        // client.subscribe('/#', {qos:2})
        console.log(client.clientId)
        topics.forEach((topic) => {
          if (!subscribedTopics.current.has(topic)) {
            client.subscribe(`${topic}`, { qos: 2 });
            console.log(`Subscribed to ${topic}`)
            subscribedTopics.current.add(topic)
            // setSubscribedTopics((prevTopics) => new Set(prevTopics).add(topic));
          }
        });
        // client.subscribe("/#", { qos: 2 })
      },
      onFailure: (error: any) => {
        console.log('MQTT connection failed:', error);
      },
      reconnect: true, // enable automatic reconnection
      cleanSession: false //
    }

    client.connect(client_params);
    client.onConnectionLost = (error) => {console.log("Connection lost: ", error)};
    client.onMessageArrived = onMessageArrived;
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateMessageContent = (newContent: MessageContent) => {
    setMessageContent(newContent);
  };

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = connectOnce();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      client.disconnect()
      // if (destroyFunc.current) {
      //   destroyFunc.current();
      // }
    };
  }, []);

  const triggerTaskCreation = () => {
    apiClient.default.triggerCreateTaskTriggerCreateTaskGet().then((data) => console.log("Task Created: ", data)).catch((error) => console.log("error triggering task creation: ", error))
  }

  const triggerTaskStart = () => {
    apiClient.default.triggerStartTaskTriggerStartTaskGet().then((data) => console.log("Task Started: ", data)).catch((error) => console.log("error triggering task start: ", error))
  }

  const triggerTaskEnd = () => {
    apiClient.default.triggerEndTaskTriggerEndTaskGet().then((data) => console.log("Task Ended: ", data)).catch((error) => console.log("error triggering end task: ", error))
  }

  const onTaskFinished = (task: TaskDocument) => {
    setMyCurrentTask(null)
    setParticipationStatus(null)
  }

  console.log("Current participation status: ", participationStatus)

  Modal.setAppElement(document.getElementById('root')!);

  return (
    <>
    <MessageModal
          content={messageContent}
          isOpen={modalOpen}
          onClose={closeModal}
        />
    <div className="container mx-auto px-4 py-8">
      
      <div className="text-center text-lg font-bold">{currentProfile?.role == PlayerRoleEnum.SPY ? "ELIMINATE ALL CITIZENS" : "ELIMINATE ALL SPIES"}</div>
      <div className="mb-4">
      <div>Profile: {currentProfile?.name}</div>
      <div>Life Remaining: {currentProfile?.lives_left}</div>
      </div>
      <div className={`p-4 mb-4 rounded-lg shadow-md bg-white flex flex-col items-center justify-center space-y-2`}>
          {myCurrentTask?.status == TaskStatusEnum.WAITING_FOR_PARTICIPANTS ? <TaskIsWaitingForParticipantsView myCurrentTask={myCurrentTask} setMyCurrentTask={setMyCurrentTask!} currentProfile={currentProfile!} participationStatus={participationStatus!} timeStamp={taskTimeStamp.current} />:
          myCurrentTask?.status == TaskStatusEnum.ONGOING && participationStatus == ParticipantStatusEnum.JOINED? 
            <TaskIsOngoingView currentProfile={currentProfile!} myCurrentTask={myCurrentTask} setMyCurrentTask={setMyCurrentTask} timeStamp={taskTimeStamp.current} onTaskFinished={onTaskFinished}/>
          : <>Waiting for new task...</>
          }
      </div>
      {/* <div>Current Event: {currentEvent?.code}</div>
      <div><Button purpose={"primary"} onClick={triggerTaskCreation}>Trigger Task Creation</Button></div>
      <div><Button purpose={"primary"} onClick={triggerTaskStart}>Trigger Task Start</Button></div>
      <div><Button purpose={"primary"} onClick={triggerTaskEnd}>Trigger Task End</Button></div>

      

      <div className="mt-4">
        {Array.from(messages).map((message, index) => {
          const content = JSON.parse(message.payloadString)

          return (
            <div key={index} >
              <h2 >{message.destinationName}</h2>
              <div className={`p-4 mb-4 rounded-lg shadow-md bg-white`}>
                <div className={'text-l'} >{content.message}</div>
      

                
              <br />
              <hr />
                <div className={'text-xs'} ><pre>{JSON.stringify(content, null, 2)}</pre></div>
              </div>
            </div>
          )
        })}
      </div> */}
    </div>
    </>
  );
};

export default MQTTComponent;
