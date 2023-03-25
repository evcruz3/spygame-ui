import React, { useEffect, useRef, useState } from 'react';
import { Client, Message, TypedArray } from 'paho-mqtt';
import { $GameEventDocument, GameEventDocument, ParticipantStatusEnum, PlayerDocument, TaskDocument, TaskStatusEnum } from '../client';
// import { useTransition, animated } from 'react-spring';


// /events/{event_code}                                       - event announcements + EventDocument
// /events/{event_code}/players/{player_id}/life              - announcement for particular player's health + PlayerDocument
// /events/{event_code}/players/{player_id}/task              - announcement for particular player's task + TaskDocument
// /events/{event_code}/players/{player_id}/role              - announcement about role of player + PlayerDocument
// /events/{event_code}/tasks/{task_id}/participants          - announcement when a player joins the task + TaskDocument  
// /events/{event_code}/tasks/{task_id}/state                 - announcement about the task's state + TaskDocument


class CustomSet<Message> extends Set<Message> {
  add(value: Message): this {
    for (const existingValue of this) {
      if (existingValue.destinationName === value.destinationName) {
        // An object with the same `destinationName` property already exists in the set
        // so we don't need to add the new object
        super.delete(existingValue)
        super.add(value)
        return this
      }
    }
    // No object with the same `destinationName` property exists in the set, so we can add the new object
    super.add(value);
    return this;
  }
}

type MQTTComponentProps = {
  event_id: string,
  player_id: string
}

function MQTTComponent(props: MQTTComponentProps) {
  const subscribedTopics = useRef<Set<string>>(new Set());
  const [messages, setMessages] = useState<Array<Message>>(new Array());
  // const prefix = '/events/' + props.event_id
  const eventPrefix = '/events/' + props.event_id
  const playerPrefix = eventPrefix + '/players/' + props.player_id
  const taskPrefix = eventPrefix + '/tasks'
  const topics = [`${eventPrefix}`, `${playerPrefix}/life`, `${playerPrefix}/task`, `${playerPrefix}/role`, `${taskPrefix}`]
  const [currentTask, setCurrentTask] = useState<TaskDocument | null>()
  const [currentProfile, setCurrentProfile] = useState<PlayerDocument>()
  const [currentEvent, setCurrentEvent] = useState<GameEventDocument>()
  const [participationStatus, setParticipationStatus] = useState<ParticipantStatusEnum>()
  // `

  const destroyFunc = useRef<void>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);
  const client = new Client('localhost', 9001, '', 'client-id-' + Math.random());


  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  // Ensure that upload of sequences with no seqid are only done ONCE
  var connectOnce = () => {

    const onMessageArrived = (message: Message) => {
      // const messageData = message.payloadString;
      const payloadObject = JSON.parse(message.payloadString)
    
      if ("task_document" in payloadObject){
        // console.log("isTaskDocument")
        const task = payloadObject.task_document as TaskDocument
        const participant = task.participants.find((value) => 
          value.player instanceof String ? value.player == props.player_id 
            : value.player["$oid"] == props.player_id)
        if (participant != null){
          // if (participant.status != ParticipantStatusEnum.NOT_JOINED){
          //   setCurrentTask(payloadObject.task_document as TaskDocument)
          // }
          // setCurrentTask(null)
          setCurrentTask(payloadObject.task_document as TaskDocument)
          setParticipationStatus(participant.status)
          
          const topic = `${taskPrefix}/${task.task_code}/#`
          if(participant.status != ParticipantStatusEnum.NOT_JOINED){
            if (!subscribedTopics.current.has(topic)) {
              client.subscribe(`${topic}`, { qos: 2 });
              console.log(`Subscribed to ${topic}`)
              subscribedTopics.current.add(topic)
              // setSubscribedTopics((prevTopics) => new Set(prevTopics).add(topic));
            }
          }
          else{
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
          }
        }
      }
      else if ("player_document" in payloadObject){
        // console.log("isPlayerDocument")
        setCurrentProfile(payloadObject.player_document as PlayerDocument)
      }
      else if ("event_document" in payloadObject){
        // console.log("isEventDocument")
        setCurrentEvent(payloadObject.event_document as GameEventDocument)
      } 
      else {
        console.log(`unknown document type`)
        console.log(payloadObject)
      }
      messages.unshift(message)
      setMessages(messages);
    };

    client.connect({
      onSuccess: () => {
        console.log("Successfully connected to mqtt broker")
        // client.subscribe('/#', {qos:2})
        topics.forEach((topic) => {
          if (!subscribedTopics.current.has(topic)) {
            client.subscribe(`${topic}`, { qos: 2 });
            console.log(`Subscribed to ${topic}`)
            subscribedTopics.current.add(topic)
            // setSubscribedTopics((prevTopics) => new Set(prevTopics).add(topic));
          }
        });
      },
      onFailure: (error: any) => {
        console.log('MQTT connection failed:', error);
      }
    });

    client.onMessageArrived = onMessageArrived;
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-lg font-bold">MQTT Messages</div>
      <div>Life Remaining: {currentProfile?.lives_left}</div>
      <div>Current Task: {currentTask?.task_code} | {participationStatus}</div>
      <div>Current Event: {currentEvent?.code}</div>
      <div className="mt-4">
        {Array.from(messages).map((message, index) => {
          const content = JSON.parse(message.payloadString)

          return (
            <div key={index} >
              <h2 >{message.destinationName}</h2>
              <div className={`p-4 mb-4 rounded-lg shadow-md bg-white`}>
                <div className={'text-l'} >{content.message}</div>
                <br />
                <div className={'text-sm'} >{message.payloadString}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default MQTTComponent;
