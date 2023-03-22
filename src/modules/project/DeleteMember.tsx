import { useEffect, useState } from "react";
import {Navigate, useParams } from "react-router-dom";
import { APIClient, ApiError, ProjectProfileDocument, UserProjectRoleDocument, OpenAPI, ProjectRole, UserProfileDocument } from "../../client";
import { DisplayAccessDenied, DisplayPVDServerError } from "../../components/display";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";
import { useAuth } from "react-oidc-context";
import { BackButton } from "../../components/input/Button";

function DeleteMember() {
    const client = new APIClient(OpenAPI);
    const [deleteError, setDeleteError] = useState<ApiError>();
    const [profileDeleted, setProfileDeleted] = useState<boolean>(false);

    // Important to note: useParams depends on the Home route parameter
    const projID = useParams().id!
    const userID = useParams().userId!

    const auth = useAuth();
    const [projectMembers, setProjectMembers] = useState<Array<UserProjectRoleDocument>>();
    const [projectName, setProjectName] = useState<string>("");
    const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();
    const [error, setError] = useState<ApiError>();
    
    const userRoleSwitcher = useUserRoleSwitcher();

    const allowedRoles = [ProjectRole.REMOVE_MEMBERS];

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectProjectsProjectIdGet(projID)
            .then((data: ProjectProfileDocument) => {
                setProjectName(data.project_title);
                return client.projects.getAllProjectMembersProjectsProjectIdMembersGet(projID, 0);
            }).then((data: Array<UserProjectRoleDocument>) => {
                setProjectMembers(data);
            }).catch((error: ApiError) => setError(error)) 
        }
    }, [auth.user]);

    useEffect(() => {
        if (projectMembers) {
            client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub)
            .then((data: UserProfileDocument) => {
                setCurrentMember(projectMembers?.find((mem) => mem.user_id._id == data._id));
            });
        }
    }, [projectMembers])

    useEffect(() => {
        if(userRoleSwitcher.activeRole == 'pvd-member' && !profileDeleted) {
            console.log(userID, projID);
            
            client.projects.deleteProjectMemberProjectsProjectIdMembersUserIdDelete(projID, userID).then((deletedProfile: UserProjectRoleDocument) => {
                setProfileDeleted(true);
                console.log(deletedProfile);
            }).catch((error: ApiError) => {
                setDeleteError(error);
                console.log("error!");
                console.log(deleteError);
            });
        }
    }, [profileDeleted]);
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (currentMember == undefined) {
        return <DisplayAccessDenied
            reason="Only members of this project may view this page." 
            action="Please request access from a project member with member permission access roles." />
    } else if (!((allowedRoles.filter((role: ProjectRole) => currentMember.role!.includes(role))).length)) {
        return (<>
        <BackButton></BackButton>
        <DisplayAccessDenied required_role={allowedRoles} 
            reason="Only those with the following permissions may view this page:" 
            action="Please request access from a project member with member permission access roles."/>
        
        </>)
    } else if (error) {
        return <DisplayPVDServerError error={error} />;
    } else if(profileDeleted) return <Navigate to={"/projects"} replace={true} state={projID} />
}

export default DeleteMember;