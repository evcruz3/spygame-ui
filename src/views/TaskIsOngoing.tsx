import { Client, Message } from "paho-mqtt";
import { useEffect, useRef, useState } from "react";
import { APIClient, OpenAPI, ParticipantStatusEnum, PlayerDocument, PlayerRoleEnum, TaskDocument, TaskStatusEnum, TaskTypeEnum } from "../client";
import Button from "../components/Button";
import CountDown from "../components/CountDown";

interface Props {
    symbol: TaskTypeEnum;
    isShuffling: boolean;
    setIsShuffling: React.Dispatch<React.SetStateAction<boolean>>;
}
    
const SymbolDisplay = ({ symbol, isShuffling, setIsShuffling }: Props) => {
    const [displayedSymbol, setDisplayedSymbol] = useState<TaskTypeEnum>(
    getRandomSymbol()
    );
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
    if(isShuffling == true){
        const timer = setInterval(() => {
        setDisplayedSymbol(getRandomSymbol());
        setCounter((prevState) => prevState + 1);
        }, 125);

        if (counter >= 40) {
        clearInterval(timer);
        setDisplayedSymbol(symbol);
        setIsShuffling(false)
        }

        return () => clearInterval(timer);
    }
    else{
        setDisplayedSymbol(symbol);
    }

    return;
    
    }, [symbol, counter]);

    return <div>{displayedSymbol}</div>;
};

const getRandomSymbol = (): TaskTypeEnum => {
    const symbols: TaskTypeEnum[] = [TaskTypeEnum.DIAMOND, TaskTypeEnum.HEART, TaskTypeEnum.SPADE];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
};

  
export function TaskIsOngoingView(props: {currentProfile: PlayerDocument, myCurrentTask: TaskDocument, setMyCurrentTask: React.Dispatch<React.SetStateAction<TaskDocument | null | undefined>>, timeStamp: Date, onTaskFinished: (task: TaskDocument) => void}) {
    // const [type, setTaskType] = useState<TaskTypeEnum>(props.myCurrentTask.type)
    const timeDifference = Math.floor((new Date().getTime() - props.timeStamp.getTime())/1000 % 60)
    const [isShuffling, setIsShuffling] = useState<boolean>(timeDifference > 7 ? false : true)
    const taskTimeStamp = useRef<Date>(props.timeStamp)
    const [message, setMessage] = useState<string>('')
    // const [currentTask, setCurrentTask] = useState<TaskDocument>(props.myCurrentTask)

    const apiClient = new APIClient(OpenAPI);

    const subscribedTopics = useRef<Set<string>>(new Set());
    const eventPrefix = '/events/' + props.myCurrentTask.event_code
    const taskPrefix = eventPrefix + '/tasks'
    const playerPrefix = eventPrefix + '/players/' + props.currentProfile._id
    const task_topics = [`${taskPrefix}/${props.myCurrentTask.task_code}/state`, `${playerPrefix}/task`]

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

            if(payloadObject.task_document.status == TaskStatusEnum.FINISHED){
                console.log("task is finished, mqtt client disconnecting now...")
                // console.log("mounted? : ", mounted.current)
                // if(mounted.current == true && client.isConnected() == true)
                //     client.disconnect()
                props.onTaskFinished(props.myCurrentTask)
            } else if(timeStamp >= taskTimeStamp.current){
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


    console.log("joined participants: ", props.myCurrentTask.participants.filter((participant) => participant.status == ParticipantStatusEnum.JOINED))
    const additional_actions = props.myCurrentTask.type == TaskTypeEnum.DIAMOND && props.currentProfile.role == PlayerRoleEnum.SPY? <>
        <div>Who do you want to kill?</div>
        {props.myCurrentTask.participants.filter((participant) => participant.status == ParticipantStatusEnum.JOINED).map((participant) => {
            return (<div className="flex-row">{(participant.player as PlayerDocument).name} <Button purpose={"link"}>Kill</Button></ div>)
        })}
    </> : <>
        <div>Current players</div>
        {props.myCurrentTask.participants.filter((participant) => participant.status == ParticipantStatusEnum.JOINED).map((participant) => {
            return (<div className="flex-row">{(participant.player as PlayerDocument).name} - {(participant.player as PlayerDocument).lives_left} lives left</ div>)
        })}
    </>

    return (
      <>
        <SymbolDisplay isShuffling={isShuffling} setIsShuffling={setIsShuffling} symbol={props.myCurrentTask.type} />
        {isShuffling == false ? 
        <>
            <div className="text-3xl text-red-600">
            <CountDown targetDate={new Date(Date.UTC(
                Number(props.myCurrentTask?.end_time!.substring(0, 4)),
                Number(props.myCurrentTask?.end_time!.substring(5, 7)) - 1,
                Number(props.myCurrentTask?.end_time!.substring(8, 10)),
                Number(props.myCurrentTask?.end_time!.substring(11, 13)),
                Number(props.myCurrentTask?.end_time!.substring(14, 16)),
                Number(props.myCurrentTask?.end_time!.substring(17, 19))))}/>
            </div>
            {message}
            <br />
            {additional_actions}
        </>
        : <></>}
      </>
    )

}