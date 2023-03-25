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
  const [eventCodeFromStorage] = useState<string>("event code");
  const [playerNameFromStorage] = useState<string>("player name");

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      eventCode: eventCodeFromStorage,
      playerName: playerNameFromStorage,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { eventCode, playerName } = data;
    useState<string>("event code");
    useState<string>("player name");
    joinEvent(eventCode, playerName);
  };

  const { errors } = formState;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <TextInput
          label="Event Code"
        //   name="eventCode"
        //   onChange={register(
        //     getRequiredValidation("Please enter the event code"),
        //     minLengthValidation(6, "Event code must be at least 6 characters")
        //   )}
        //   onBlur={register()}
          {...register("eventCode", {required: true})}
          errors={errors}
          flex="mb-4"
        />

        <TextInput
          label="Player Name"
        //   name="playerName"
        //   onChange={register(
        //     getRequiredValidation("Please enter your player name")
        //   )}
        //   onBlur={register()}
        {...register("eventCode", {required: true})}
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
  );
};

export default HomePage;
