import { Link } from 'react-router-dom';
import React from 'react';

type LinkProps = {
    to: any,
    replace: boolean,
    className?: string,
    children: React.ReactNode
} & Partial<typeof Link>;

/**
 * A version of Link that is formatted with blue text and underline.
 */
const Hyperlink = React.forwardRef<HTMLAnchorElement, LinkProps>(({className, ...props}: LinkProps, ref) => {
    return (
        <Link
            ref={ref}
            className={"underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" + className}
            {...props} >
            {props.children}
        </Link>
    );
});

export default Hyperlink;