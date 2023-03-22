import React from "react";
import { ChangeHandler } from "react-hook-form";

type RadioListProps = {
    label?: string,
    choices: string[] | {[key: string]: any},
    inline_label?: boolean,
    inline_options?: boolean,
    inline?: boolean,
    register: any,
    radioName?: string,
}

const RadioList = React.forwardRef<HTMLElement, RadioListProps>(({label, choices, inline_label=false, inline_options=false, inline=false, register, radioName='radio', ...props}: RadioListProps, ref) => {
    const inlined_label = inline_label || inline ? " flex-row" : " flex-col "
    const inlined_options = inline_options || inline ? " flex-row" : " flex-col "
    const listLabel = label && <h4 className="block text-gray-700 text-sm font-bold">{label}</h4>
    choices = Array.isArray(choices) ?
        (choices as string[]).reduce((o, choice) => ({...o, [choice]: choice}), {}) : choices;
    const rendered_options = Object.keys(choices).map((k: string) => {
        return <label className="form-check-label inline-block text-gray-800 px-4">
            <input className={"form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"} 
                type="radio"
                {...register(radioName)}
                value={(choices as {[key: string]: any})[k]}
            />
            {k}
        </label>
    });

    return <div className={"flex"+inlined_label}>
        {listLabel}
        <div className={"flex"+inlined_options}>
            {rendered_options}
        </div>
    </div>
});

export default RadioList;