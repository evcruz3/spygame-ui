type BodyProps = {
    children?: React.ReactNode;
}

function Body(props: BodyProps) {
    return (
        <div className="px-10 pt-24 bg-gray-100 flex-grow">
            {props.children}
            
        </div>
        
    );

   

}

export default Body;