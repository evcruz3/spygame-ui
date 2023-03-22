import React, { useState } from "react";

type CheckboxListProps = {
    label?: string;
    choices: string[];
    inline?: boolean;
    register: any;
    checkboxName?: string;
  };
  
  const CheckboxList = React.forwardRef<HTMLElement, CheckboxListProps>(
    (
      {
        label,
        choices,
        inline = false,
        register,
        checkboxName = 'checkbox',
        ...props
      }: CheckboxListProps,
      ref
    ) => {
      const inlined = inline ? ' form-check-inline ' : '';
      const listLabel = label && <h4>{label}</h4>;
  
      const rendered_options = choices.map((item: string) => (
        <label
          key={item}
          className={`form-check-label inline-block text-gray-800 px-4 ${inlined}`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            value={item}
            name={checkboxName}
            {...register(`${checkboxName}.${item}`)}
          />
          {item}
        </label>
      ));
  
      return (
        <div>
          {listLabel}
          {rendered_options}
        </div>
      );
    }
  );
  
  export default CheckboxList;
  