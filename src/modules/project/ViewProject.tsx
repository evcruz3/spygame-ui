import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, ProjectRole, UserProfileDocument, UserProjectRoleDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo, Hyperlink } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import SingleProjectLayout from './SingleProjectLayout';

/**
 * @prop project The data from the project record to display.
 * @returns The data and a modal for deletion confirmation purposes.
 */
function DisplayProject(props: {project: ProjectProfileDocument}) {
        const proj = props.project;
        return <>
            <RedConfirmModal
                header={'Deleting this project'} body={`Are you sure you want to delete ${proj.project_title} from our records?`}
            />
            <div className="border border-gray-100 rounded shadow-md sm:rounded-lg p-4 bg-white">
            <ul>
                <li><DisplayTextInfo label="Project ID" value={proj._id} /></li>
                <li><DisplayTextInfo label="Project Title" value={proj.project_title} /></li>
                <li><DisplayTextInfo label="Implementing Institution" value={proj.implementing_institution} /></li>
                <li><DisplayTextInfo label="Funding Institution" value={proj.funding_institution} /></li>
                <li><DisplayTextInfo label="Project Start Date" value={proj.project_start_date} /></li>
                <li><DisplayTextInfo label="Project End Date" value={proj.project_end_date} /></li>
                <li><DisplayTextInfo label="User ID" value={[proj.user_id.map(getFullName)].join(", ")} /></li>
            </ul>
            
            </div>
        </>
}

function getFullName(item: any) {
    return [item.first_name,item.last_name].join(" ");
}

/**
 * @returns Corresponding page to display depending on whether the project is set.
 */
function ViewProject() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [project, setProject] = useState<ProjectProfileDocument>();
    const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const projID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectProjectsProjectIdGet(projID)
                .then((data: ProjectProfileDocument) => {
                setProject(data);
                return client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub);
               }).then((data: UserProfileDocument) => {
                return client.projects.getSingleProjectMemberProjectsProjectIdMembersUserIdGet(projID, data._id!);
               }).then((data: UserProjectRoleDocument) => {
                setCurrentMember(data);
               }).catch((error: ApiError) => setError(error));
        }
    }, [auth.user]);
    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (error) {
        if (error.status == 404 && currentMember == undefined) {
            return <DisplayAccessDenied
                reason="Only members of this project may view this page." 
                action="Please request access from a project member with member permission access roles." />
        }
        return <DisplayPVDServerError error={error} />;
    }
    else if(project){
        return <>
            <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deleting Project'} 
                body={<>Are you sure you would like to delete <b>{project?.project_title}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            />
            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                <DisplayProject project={project} />
                {/* <DeleteButton />
                <EditButton /> */}
            </SingleProjectLayout>
        </>
    }
    else {
        return <DisplayInfoLoading/>;
    }
}

export default ViewProject;