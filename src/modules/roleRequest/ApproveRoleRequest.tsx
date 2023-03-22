import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIClient, OpenAPI, ApiError, RequestState, UserRoleRequest } from "../../client";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";
import {Navigate } from 'react-router-dom';
import { DisplayAccessDenied } from "../../components/display";

function ApproveRoleRequest() {
    const client = new APIClient(OpenAPI);
    const [getRequestError, setGetRequestError] = useState<ApiError>();
    const reqID = useParams().id!;
    const [statusChanged, setStatus] = useState<UserRoleRequest["status"]>();
    const userRoleSwitcher = useUserRoleSwitcher()
    const data = {status: RequestState.APPROVED}

    useEffect (() => { 
        client.users.updateUserRoleRequestUsersRoleRequestsRequestIdPatch(reqID, data).then(() => {
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
   
    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role={["pvd-super-admin"]} />;
    } else if(statusChanged) return <Navigate to={"/role-requests"} replace={true} state={reqID} />
}

export default ApproveRoleRequest;