import { useEffect, useRef, useState } from "react";

type MultiselectOption = {
    name: string,
    label: string
}

type MultiselectProps = {
    options: Array<MultiselectOption>,
    register: any,
    errors?: any,
    label?: string,
} & Partial<JSX.Element>;

function Multiselect({options, register, errors, label="", ...props}: MultiselectProps) {
    const [hideOptions, setHideOptions] = useState<string>(" hidden ");
    const ref = useRef<any>(null);
    
    const rendered_options = options.map((item: any) => {
        return <label className="block form-check-label text-gray-800">
            <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox" {...register(item.name)}/>
            {item.label}
        </label>
    });

    useEffect(() => {
        function clickedOutside(e: any) {
            if (ref.current && !ref.current.contains(e.target)) {
                setHideOptions(" hidden ");
            }
        }

        document.addEventListener("mousedown", clickedOutside);

        return () => {document.removeEventListener("mousedown", clickedOutside)}
    }, [ref])


    return <label ref={ref} className="text-base font-bold mb-6">
        {label}
        <div className="font-normal relative">
            <select onClick={() => {setHideOptions(hideOptions == "" ? " hidden " : "")}} 
            className="
                w-64
                relative
                pl-3
                py-1.5
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                m-0"
            >
                <option>Click to select multiple options</option>
            </select>
                <div className="absolute inset-0"/>
        </div>
        <div className="relative w-64">
            <div className={"pl-1 absolute inset-x-0 overflow-auto form-check font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded m-0 " + hideOptions}
            >
                {rendered_options}
            </div>
        </div>
    </label>
}

export default Multiselect;