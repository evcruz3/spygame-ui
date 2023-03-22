import { useEffect, useState } from "react";
import {Navigate, useParams } from "react-router-dom";
import { APIClient, ApiError, ProjectProfileDocument, OpenAPI } from "../../client";
import { DisplayAccessDenied } from "../../components/display";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";


function DeleteProject() {
    const client = new APIClient(OpenAPI);
    const [deleteError, setDeleteError] = useState<ApiError>();
    const [profileDeleted, setProfileDeleted] = useState<boolean>(false);
    const projID = useParams().id!
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if(userRoleSwitcher.activeRole == 'pvd-member' && !profileDeleted) {
            client.projects.deleteProjectProjectsProjectIdDelete(projID).then((deletedProfile: ProjectProfileDocument) => {
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
    } else if(profileDeleted) return <Navigate to={"/projects"} replace={true} state={projID} />
}

export default DeleteProject;