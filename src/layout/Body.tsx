type BodyProps = {
    children?: React.ReactNode;
}

function Body(props: BodyProps) {
    return (
        <div className="bg-gray-100 h-screen w-screen">
            {props.children}
        </div>
        
    );

   

}

export default Body;