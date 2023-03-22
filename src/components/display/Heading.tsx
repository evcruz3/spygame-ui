import React from "react";

type HeadingProps = {
    className?: string,
    level: number,
    children?: React.ReactNode
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(({level, className="", ...props}: HeadingProps, ref) => {
    /* was too lazy to find programmatically nice way to do this this should do for now ? */
    switch (level) {
        case 1:
            return <h1 className={"text-3xl pb-2 font-semibold " + className}>{props.children}</h1>;
        case 2:
            return <h2 className={"text-2xl pb-2 font-semibold " + className}>{props.children}</h2>;
        case 3:
            return <h3 className={"text-xl pb-2 font-semibold " + className}>{props.children}</h3>;
        case 4:
            return <h4>{props.children}</h4>;
        case 5:
            return <h5>{props.children}</h5>;
        case 6:
            return <h6>{props.children}</h6>;
    
        default:
            return <></>
    }
});

export default Heading;