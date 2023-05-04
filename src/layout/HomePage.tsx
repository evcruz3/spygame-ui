import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
// import TextInput from "./TextInput";
// import { getRequiredValidation, minLengthValidation } from "./validations";

interface Props {
  joinEvent: (eventCode: string, playerName: string) => void;
}

type FormValues = {
  eventCode: string;
  playerName: string;
};

const HomePage: React.FC<Props> = ({ joinEvent }) => {
  const [eventCodeFromStorage] = useState<string>("");
  const [playerNameFromStorage] = useState<string>("");

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      eventCode: eventCodeFromStorage,
      playerName: playerNameFromStorage,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { eventCode, playerName } = data;
    // useState<string>("");
    // useState<string>("");
    joinEvent(eventCode, playerName);
  };

  const { errors } = formState;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid grid-cols-1 divide-y-2 bg-white shadow-md rounded px-8 py-6 gap-y-4">
        <div>
          <p className="pb-4 text-sm">Join Event</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Event Code"
              {...register("eventCode", {required: true})}
              errors={errors}
              flex="mb-4"
            />
            <TextInput
              label="Player Name"
              {...register("playerName", {required: true})}
              errors={errors}
              flex="mb-6"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Join Event
            </button>
          </form>
          {eventCodeFromStorage && playerNameFromStorage && (
          <div className="text-center">
            You've already joined the event!
          </div>
        )}
        </div>
        <div className="pt-4">
          <p className="pb-4 text-sm">or Create Event</p>
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
