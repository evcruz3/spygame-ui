type ChipProps = {
    children?: React.ReactNode | string,
};

function Chip(props: ChipProps) {
    return <span
        className="m-px px-2 py-1 rounded text-gray-500 bg-gray-300 font-semibold text-xs align-center w-max active:bg-gray-300 transition duration-300 ease">
        {props.children}
    </span>
};

export default Chip;