import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, UserProfileDocument, UserProjectRoleDocument} from '../../client';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import {
    DisplayInfoLoading,
    DisplayPVDServerError,
    DisplayTable,
    Hyperlink,
    DisplayAccessDenied
} from '../../components/display';

import {
    Button
} from '../../components/input';

import { 
    ColumnData, Renderer 
} from '../../components/display/DisplayTable';

import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import Scaffold from '../../components/display/Scaffold';

/**
 * @prop projects   List of projects to be displayed in table form.
 * @prop colHeaders     Data on the headers of the institution table to be displayed.
 * @returns A DisplayTable element that displays the list of projects with an edit and delete button each entry.
 */
function DisplayProjects(props: {projects: any,colHeaders: ColumnData<ProjectProfileDocument>[]}) {
    if (props.projects) {
        return (
            <>
                 <DisplayTable data={props.projects} columns={props.colHeaders}/>
            </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewProjects() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [project, setProjectProfile] = useState<ProjectProfileDocument[]>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const location = useLocation();
    const userRoleSwitcher = useUserRoleSwitcher();

    
    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewAllProjectsProjectsGet().then((data: ProjectProfileDocument[]) => {
                console.log(data);
                return client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub);
            }).then((data: UserProfileDocument) => {
                return client.users.viewUserProjectsUsersUserIdProjectsGet(data._id!);
            }).then((data: ProjectProfileDocument[]) => {
                setProjectProfile(data)
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [location.state]);

    const columnHeaders: ColumnData<ProjectProfileDocument>[] = [
        { heading: 'id', value: '_id', renderer: ((data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>) as Renderer},
        { heading: 'Project', value: 'project_title' },
        { heading: 'Implementing Institution', value: 'implementing_institution' },
        { heading: 'Starting Date', value: 'project_start_date' },
    ]

    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;  
    
    } else if (error) {
        if (error.status == 404) {
            // if there is no project, Add a Project.
            return (
                <>
                    <p>There's no registered project.</p>
                    <Button purpose='primary' onClick={() => navigate('add')}>Add a Project</Button>
                </>
            );
        } 
        return <DisplayPVDServerError error={error} />;
    } else {
        return (
            <>
                 <Scaffold header={"My Projects"} body={<DisplayProjects projects={project} colHeaders={columnHeaders} />} floatingActionButton={<Button purpose='primary' className="z-50 shadow" onClick={() => { navigate('add'); } }>Add a Project</Button>} footer={undefined}     />
            </>
        );
    }
}

export default ViewProjects;
