import { Link } from "react-router-dom";
import { project } from "..";
import Scaffold from "../../components/display/Scaffold";
import { BackButton, DeleteButton, EditButton } from "../../components/input/Button";
import { Sidebar } from "../../layout";

type ProjectProps = {
    proj_id: string,
    proj_title: string,
    footer?: React.ReactNode | React.ReactNode[];
    floatingActionButton?: React.ReactNode | React.ReactNode[];
    children?: React.ReactNode | React.ReactNode[];
}

function SingleProjectLayout(props: ProjectProps) {
    const proj_id = props.proj_id;
    const proj_title = props.proj_title;

    return <div className='flex flex-row'>
        <div className="flex flex-col ">
            <BackButton />
            <Sidebar proj_id={proj_id} />
        </div>
        
        <div className='flex grow flex-col ml-6'>
            <Scaffold header={proj_title} body={props.children} floatingActionButton={props.floatingActionButton} footer={props.footer}/>
        </div>
    </div>
}

export default SingleProjectLayout;