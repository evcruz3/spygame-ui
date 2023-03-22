import React from 'react';
import Heading from '../display/Heading';

type FormProps = {
    title: string,
    children: React.ReactNode, // TODO: restrict children to HTMLFormElement
} & Partial<JSX.IntrinsicElements['form']>;

const Form = React.forwardRef<HTMLFormElement, FormProps>(({title, ...props}: FormProps, ref) => {
    // NOTE FROM BARBS: removed class "mx-4" bc it was making it stick out of parent divs (esp in edit draft and modals)
    return(
        <form {...props} className="w-full px-4 py-4 bg-white rounded-lg" ref={ref} >
        {/* <form {...props} className="w-full mx-4 px-4 py-4 bg-white border rounded" ref={ref} > */}
            <h2 className="text-xl mb-4">{title}</h2>
            {props.children}
        </form>
    );
});
type FormRowProps = {
    children?: React.ReactNode,
    className?: string,
};

const FormRow = function(props: FormRowProps) {
    return (
        <div className={"flex flex-row flex-wrap justify-start pb-4 mb-4 gap-x-2 gap-y-4 " + props.className}>
            {props.children}
        </div>
    );
}

function FormGroup(props: {groupName: string, children: React.ReactNode}) {
    return <>
        {/* <section className='border-b border-gray-400 gap-y-4 pb-4 mb-4'> */}
        <section className='border-b border-gray-400 gap-y-4 pb-4 mb-4'>
            <h3>{props.groupName}</h3>
            {props.children}
        </section>
    </>
}

export default Form;
export {FormRow, FormGroup}