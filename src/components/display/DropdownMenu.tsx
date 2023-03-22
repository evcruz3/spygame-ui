import React from 'react';

type HeaderProps = {
    className?: string,
} & Partial<JSX.IntrinsicElements["h6"]>;

type ItemProps = {
    onClick?: any,
    className?: string,
} & Partial<JSX.IntrinsicElements["a"]>;

function DropdownMenu(props: any) {
    const ariaLabel = props.ariaLabel ? props.ariaLabel : "profileDropdown";
    return <ul
        className="
            dropdown-menu
            z-50 hidden my-4 text-base list-none bg-white rounded-lg shadow dark:bg-gray-700 py-2 items-center
        "
        aria-labelledby={ariaLabel}>
            {props.children}
    </ul>;
}

const DropdownHeader= React.forwardRef<HTMLHeadingElement, HeaderProps>(({className, ...props}: HeaderProps, ref) => {
    return (
        <h6 ref={ref}
            className={"text-gray-500 font-semibold px-4 text-xs whitespace-nowrap bg-transparent uppercase " + className}
            {...props}
        >{props.children}</h6>
    );
});

const DropdownItem = React.forwardRef<HTMLAnchorElement, ItemProps>(({onClick, className, ...props}: any, ref) => {
    return (
        <li ><a
            ref={ref}
            onClick={onClick}
            style={{cursor:"pointer"}}
            className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white " + className}
            >
            {props.children}
        </a></li>
    )
});

export default DropdownMenu;
export { DropdownHeader, DropdownItem };