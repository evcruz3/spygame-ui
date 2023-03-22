import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { APIClient, ApiError, BioseqSetCreationDocument, DraftSequenceDocument, OpenAPI } from "../../client";
import { DisplayAccessDenied } from "../../components/display";
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

function DeleteDraftSequence() {
    const client = new APIClient(OpenAPI);
    const [deleteError, setDeleteError] = useState<ApiError>();
    const [draftDeleted, setDraftDeleted] = useState<boolean>(false);
    const creationID = useParams().creationID!
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const projID = useParams().id!;
    console.log(useParams())

    useEffect(() => {
        if(!draftDeleted) {
            client.projects.deleteProjectDraftSequenceCreationProjectsProjectIdDraftCreationsCreationIdDelete(projID,creationID).then((deletedDraft: BioseqSetCreationDocument) => {
                setDraftDeleted(true);
                console.log(deletedDraft);
            }).catch((error: ApiError) => {
                setDeleteError(error);
                console.log("error!");
                console.log(deleteError);
            });
        }
    }, [draftDeleted]);
    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if(draftDeleted) return <Navigate to={"/projects/"+projID+"/draft_creations"} replace={true} />
}

export default DeleteDraftSequence;