import { Client, Message } from "paho-mqtt";
import { useRef, useState, useEffect } from "react";
import { TaskDocument, PlayerDocument, ParticipantStatusEnum, APIClient, OpenAPI, ApiError, TaskStatusEnum } from "../client";
import Button from "../components/Button";
import CountDown from "../components/CountDown";

export function TaskIsWaitingForParticipantsView(props: {myCurrentTask: TaskDocument, setMyCurrentTask: React.Dispatch<React.SetStateAction<TaskDocument | null | undefined>>, currentProfile: PlayerDocument, participationStatus: ParticipantStatusEnum, timeStamp: Date}) {
    const apiClient = new APIClient(OpenAPI);
    
  
    function joinTask(task_code: string) {
      apiClient.events.joinTaskEventsEventCodeTasksTaskCodeJoinPost(props.myCurrentTask.event_code, task_code, props.currentProfile!)
      .then((data) => console.log(`joined task ${task_code}: `, data))
      .catch((error: ApiError) => console.log("Failed to join task: ", error.body))
    }
  
    function notJoinTask(task_code: string){
      apiClient.events.notJoinTaskEventsEventCodeTasksTaskCodeNotJoinPost(props.myCurrentTask.event_code, task_code, props.currentProfile!)
      .then((data) => {console.log(`skipped ${task_code}: `, data);
        props.setMyCurrentTask(null)
    })
      .catch((error: ApiError) => console.log("Failed to skip task: ", error.body))
    }


    const taskTimeStamp = useRef<Date>(props.timeStamp)
    const [message, setMessage] = useState<string>('')
    // const [currentTask, setMyCurrentTask] = useState<TaskDocument>(props.myCurrentTask)
    const subscribedTopics = useRef<Set<string>>(new Set());
    const eventPrefix = '/events/' + props.myCurrentTask.event_code
    const taskPrefix = eventPrefix + '/tasks'
    // const playerPrefix = eventPrefix + '/players/' + props.player_id
    const task_topics = [`${taskPrefix}/${props.myCurrentTask.task_code}/state`, `${taskPrefix}/${props.myCurrentTask.task_code}/participants`]

    const destroyFunc = useRef<void>();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);
    const client = new Client('localhost', 9001, '', 'client-id-' + Math.random());
    const mounted = useRef(false);

    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }

    // Ensure that upload of sequences with no seqid are only done ONCE
    var connectOnce = () => {

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

            if(timeStamp >= taskTimeStamp.current){
                props.setMyCurrentTask(payloadObject.task_document as TaskDocument)
                taskTimeStamp.current = new Date(Date.UTC(
                    Number(payloadObject.timestamp!.substring(0, 4)),
                    Number(payloadObject.timestamp!.substring(5, 7)) - 1,
                    Number(payloadObject.timestamp!.substring(8, 10)),
                    Number(payloadObject.timestamp!.substring(11, 13)),
                    Number(payloadObject.timestamp!.substring(14, 16)),
                    Number(payloadObject.timestamp!.substring(17, 19))))
                setMessage(payloadObject.message)
            }
            
        }
        else {
            console.log(`unknown task document type`)
            console.log(payloadObject)
        }
        };

        const client_params = {
        onSuccess: () => {
            console.log("Successfully connected to mqtt broker")
            // client.subscribe('/#', {qos:2})
            console.log(client.clientId)
            task_topics.forEach((topic) => {
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
        reconnect: false, // enable automatic reconnection
        cleanSession: false //
        }

        client.connect(client_params);
        client.onConnectionLost = (error) => {console.log("Connection lost: ", error)};
        client.onMessageArrived = onMessageArrived;
    }

    useEffect(() => {
        // only execute the effect first time around
        mounted.current = true;
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
            console.log("setting mount to false...")
            mounted.current = false;
            client.disconnect()
        };
    }, []);
    
    return <>
      <h1>A TASK IS ABOUT TO BEGIN</h1>
        <div className="text-3xl text-red-600">
        <CountDown targetDate={new Date(Date.UTC(
    Number(props.myCurrentTask?.join_until!.substring(0, 4)),
    Number(props.myCurrentTask?.join_until!.substring(5, 7)) - 1,
    Number(props.myCurrentTask?.join_until!.substring(8, 10)),
    Number(props.myCurrentTask?.join_until!.substring(11, 13)),
    Number(props.myCurrentTask?.join_until!.substring(14, 16)),
    Number(props.myCurrentTask?.join_until!.substring(17, 19))))}/>
        </div>
          {/* <h2>Current Task: {myCurrentTask?.task_code}</h2>
          <h2>Current Status: {myCurrentTask?.status}</h2>
          <h2>Your current status: {participationStatus}</h2> */}
          <div>Players:</div>
          {props.myCurrentTask?.participants.map(
            (value) => <div key={(value.player as PlayerDocument)._id}>
              {(value.player as PlayerDocument).name} {(value.player as PlayerDocument)._id == props.currentProfile._id ? "(You)": ""}: {value.status} 
              </div>
            )
          }
          
          <div className="flex flex-col items-center justify-center space-y-2 p-4"> 
  
          {props.currentProfile != null
            && props.participationStatus == ParticipantStatusEnum.WAITING
            ?
                <><Button purpose={"danger"} onClick={
                    () => joinTask(props.myCurrentTask?.task_code!)}> Join Task</Button>
                <Button purpose={"light"} onClick={
                    () => notJoinTask(props.myCurrentTask?.task_code!)}> Skip Task</Button>
                <div className="text-xs p-2">Skipping a task deducts a life from you</div>
                </>
            :
            <>{message}...</>
          }
          </div>
    </>
  }