import React, { useState } from "react";
// import { BiomolEnumDisplay } from "../../data_model_enums";

// // type SelectProps= {
// //     label?: string,
// //     choices: string[],
// //     inline?: boolean,
// //     register: any,
// //     selectName?: string
// // }

// // const Select = React.forwardRef<HTMLElement, SelectProps>(({label, choices, inline=false, register, selectName='select', ...props}: SelectProps, ref) => {
// //     const inlined = inline ? " form-check-inline " : ""
// //     const listLabel = label && <h4>{label}</h4>
// //     const rendered_options = choices.map((item: any) => {
// //         <>
// //         <label className="form-check-label inline-block text-gray-800 px-4">Molecule Type</label>
        
// //         <select className={"form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none disable" + inlined}
// //             {...register(selectName)}
// //         >
// //             <option value="">Select Type...</option>
// //             {choices?.map((item) => { return <option key={item} value={item}>{item}</option>; })}
// //         </select>
// //         </> 
        
// //     });

// //     return <div className="flex">
// //         {listLabel}
// //         {rendered_options}
// //     </div>
// // });
// // export default Select;


// const BiomolEnumDropdown = () => {
//   const [selectedOption, setSelectedOption] = useState(BiomolEnumDisplay['Not Set']);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(parseInt(event.target.value));
//   };

//   const enumKeys = Object.keys(BiomolEnumDisplay).filter(key => isNaN(Number(key)));

//   return (
//     <div>
//       <label className="form-check-label inline-block text-gray-800 px-4" htmlFor="prot-ref-processed-enum-dropdown">Molecule Type:</label>
//       <select id="prot-ref-processed-enum-dropdown" value={selectedOption} onChange={handleChange}>
//         {enumKeys.map((key) => (
//           <option key={key} value={BiomolEnumDisplay[key]}>
//             {key}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default BiomolEnumDropdown;

type SelectListProps = {
    label?: string,
    choices: string[]| {[key: string]: any},
    inline_label?: boolean,
    inline_options?: boolean,
    inline?: boolean,
    register: any,
    required?: boolean,
    selectName?: string,
    placeholder?: boolean,
    placeholder_text?: string
  }
  
  const SelectList = React.forwardRef<HTMLElement, SelectListProps>(
    (
      { label, choices, inline_label=false, inline_options=false, inline=false, register, required = false, selectName = 'select', placeholder = true, placeholder_text, ...props }: SelectListProps,
      ref
    ) => {
      const inlined_label = inline_label || inline ? " flex-row" : " flex-col "
      const inlined_options = inline_options || inline ? " flex-row" : " flex-col "
      const listLabel = label && <h4 className="block text-gray-700 text-sm font-bold">{label}</h4>;

      const choice_keys = typeof choices === 'object' ? Object.keys(choices).filter((value) => isNaN(Number(value))) : choices
      const rendered_options = choice_keys.map((item: string, index: number) => (
        <option key={typeof choices === 'object' ? choices[item] : index} value={typeof choices === 'object' ? choices[item] : index}>
          {item}
        </option>
      ));

      return (
        
       
            <div className={"flex"+inlined_label}>
            {listLabel}
            <div className={"flex"+inlined_options}>
              <select
                  className={"form-select appearance-none block w-full pl-3 pr-9 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none disabled"} id={selectName} name={selectName} {...register(selectName, {
                    required: required
                    })}
              >
                  {(placeholder || placeholder_text) && <option value="">{placeholder_text ? placeholder_text : "Select Type..."}</option>}
                  {rendered_options}
              </select>
              </div>
            </div>
      );
    }
  );
  
  export default SelectList;
  