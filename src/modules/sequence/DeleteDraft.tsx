import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { APIClient, ApiError, DraftSequenceDocument, OpenAPI } from "../../client";
import { DisplayAccessDenied } from "../../components/display";
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

function DeleteDraft() {
    const client = new APIClient(OpenAPI);
    const [deleteError, setDeleteError] = useState<ApiError>();
    const [draftDeleted, setDraftDeleted] = useState<boolean>(false);
    const draftAcc = useParams().acc!
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if(!draftDeleted) {
            client.draftSequences.deleteDraftSequenceSequencesDraftsAccDelete(draftAcc).then((deletedDraft: DraftSequenceDocument) => {
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
    } else if(draftDeleted) return <Navigate to={"/sequences"} replace={true} state={draftAcc} />
}

export default DeleteDraft;