import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIClient, OpenAPI, UserProfileUpdateRequest, ApiError, RequestState, UserRoleRequest, PatchRequestDocument } from "../../client";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";
import {Navigate } from 'react-router-dom';
import { DisplayAccessDenied } from "../../components/display";

function ApproveRequest() {
    const client = new APIClient(OpenAPI);
    const [getRequestError, setGetRequestError] = useState<ApiError>();
    const reqID = useParams().id!;
    const [statusChanged, setStatus] = useState<UserRoleRequest["status"]>();
    const userRoleSwitcher = useUserRoleSwitcher()
    const data = {status: RequestState.APPROVED}

    useEffect (() => { 
            console.log("patching: " + reqID)
            client.users.updateUserProfileUpdateRequestUsersUpdateRequestsRequestIdPatch(reqID, data).then(() => {
                // put Approved status
                setStatus(RequestState.APPROVED);
            }).catch((error: ApiError) => {
                // Handle API Error
                // setSubmitError(error);
                setGetRequestError(error);
                console.log("Error!");
                console.log(getRequestError);
        });
    });
    
    if(userRoleSwitcher.activeRole != 'pvd-super-admin' && userRoleSwitcher.activeRole != 'pvd-site-admin') {
        return <DisplayAccessDenied required_role={["pvd-super-admin", "pvd-site-admin"]} />;
    } else if(statusChanged) return <Navigate to={"/requests"} replace={true} state={reqID} />
}

export default ApproveRequest;