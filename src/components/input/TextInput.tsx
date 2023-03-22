import React from 'react';
import  { ChangeHandler } from 'react-hook-form';
import { getInputErrorMessage } from './common';

type TextInputProps = {
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    label: string,
    name: string,
    errors: any,
    flex?: string,
} & Partial<JSX.IntrinsicElements['input']>;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({onChange, onBlur, name, label, errors, flex, ...props}: TextInputProps, ref) => {
    const error = errors[name];
    return (
        <div className={flex}>
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                type="text" 
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                id={name}
                name={name}
                {...props}                
                className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
             />
            {error && <span className="text-sm">{getInputErrorMessage(error)}</span>}
        </div>);
});

export default TextInput;