function DisplayTextInfo(props: {label: string, value: any | undefined }) {
    return (
        <>
            <div className="flex flex-row flex-wrap mx-2 pb-2 mb-2 gap-x-2 gap-y-2  border-gray-200 border-b">
            <span className='font-semibold text-gray-800'>{props.label}:  </span>
            <span className='mx-2 font-medium text-gray-700'>{props.value}</span>
            </div>
        </>
    );
}

export default DisplayTextInfo;