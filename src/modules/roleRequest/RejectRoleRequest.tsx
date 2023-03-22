import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIClient, OpenAPI, UserRoleRequest, ApiError, RequestState } from "../../client";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";
import {Navigate } from 'react-router-dom';

function RejectRoleRequest() {
    const client = new APIClient(OpenAPI);
    const [getRequestError, setGetRequestError] = useState<ApiError>();
    const reqID = useParams().id!;
    const [statusChanged, setStatus] = useState<UserRoleRequest["status"]>();
    const data = {status: RequestState.REJECTED}
    // console.log("PAsok");

    useEffect (() => { 
        client.users.updateUserRoleRequestUsersRoleRequestsRequestIdPatch(reqID, data).then(() => {
            // put Approved status
            setStatus(RequestState.REJECTED);
        }).catch((error: ApiError) => {
            // Handle API Error
            // setSubmitError(error);
            setGetRequestError(error);
            console.log("Error!");
            console.log(getRequestError);
        });
    });
   
    if(statusChanged) return <Navigate to={"/role-requests"} replace={true} state={reqID} />

    // console.log("Labas");
}

export default RejectRoleRequest;