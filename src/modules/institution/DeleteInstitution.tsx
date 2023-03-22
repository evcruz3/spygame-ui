import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { APIClient, ApiError, InstitutionProfileDocument, OpenAPI } from "../../client";
import { DisplayAccessDenied } from "../../components/display";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";

/**
 * Makes an attempt at deleting the institution, then navigates back to /institutions.
 * 
 * @returns A Navigate element that redirects to /institutions.
 */
function DeleteInstitution() {
    const client = new APIClient(OpenAPI);
    const [deleteError, setDeleteError] = useState<ApiError>();
    const [profileDeleted, setProfileDeleted] = useState<boolean>(false);
    const instiID = useParams().id!
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        // Ensures that delete attempt is only done once when successful.
        if(userRoleSwitcher.activeRole == 'pvd-super-admin' && !profileDeleted) {
            client.institutions.deleteInstitutionInstitutionsInstitutionIdDelete(instiID).then((deletedProfile: InstitutionProfileDocument) => {
                setProfileDeleted(true);
                console.log(deletedProfile);
            }).catch((error: ApiError) => {
                setDeleteError(error);
                console.log("error!");
                console.log(deleteError);
            });
        }
    }, [profileDeleted]);

    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
    } else if(profileDeleted) return <Navigate to={"/institutions"} replace={true} state={instiID} />
}

export default DeleteInstitution;