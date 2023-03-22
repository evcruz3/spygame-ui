import React from "react";
import { Link } from "react-router-dom";

type SideBarProps = {
    proj_id: string;
}

function Sidebar(props: SideBarProps) {
    return <div className="bg-gray-200 h-fit rounded-lg px-4 py-2">
        <div className="max-w-fit divide-y divide-gray-400 text-gray-800">
            <div className="py-2"><Link to={'/projects/'+props.proj_id}>Overview</Link></div>
                    <div className="py-2">
                        Sequences
                        <ul className='pl-4'>
                            <li><Link to={'/projects/'+props.proj_id+'/draft_creations'}>Draft</Link></li>
                            <li><Link to={'/projects/'+props.proj_id+'/submitted_creations'}>Submitted</Link></li>
                            <li><Link to={'/projects/'+props.proj_id+'/approved_creations'}>Approved</Link></li>
                        </ul>
                    </div>
                    <div className="py-2">
                        Settings
                        <ul className='pl-4'>
                            <li><Link to={'/projects/'+props.proj_id+'/settings'}>General</Link></li>
                            <li><Link to={'/projects/'+props.proj_id+'/settings/access'}>Access</Link></li>
                            
                        </ul>
                    </div>
        </div>
    </div>
}

export default Sidebar;