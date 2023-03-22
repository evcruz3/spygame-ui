import { APIClient, ApiError, OpenAPI, UserProfileUpdateRequest, UserRoleRequest } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @prop request The data from the request record to display.
 * @returns The data and a modal for deletion confirmation purposes.
 */
function DisplayRoleRequest(props: {request: UserRoleRequest}) {
        const req = props.request;
        return <>
            {/* <RedConfirmModal
                header={'Deleting this request'} body={`Are you sure you want to delete ${req.oidc_user_id} from our records?`}
            /> */}
            <ul>
                <li><DisplayTextInfo label="Request ID" value={req.oidc_user_id?._id} /></li>
                <li><DisplayTextInfo label="First Name" value={req.oidc_user_id?.first_name} /></li>
                <li><DisplayTextInfo label="Institution" value={req.oidc_user_id?.affiliation.institution_name} /></li>
                <li><DisplayTextInfo label="Status" value={req.status} /></li>
                <li><DisplayTextInfo label="Role" value={req.role} /></li>
            </ul>
        </>
}
/**
 * @returns Corresponding page to display depending on whether the request is set.
 */
function ViewRoleRequest() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [request, setRequest] = useState<UserRoleRequest>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const reqID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.getUserRoleRequestUsersRoleRequestsRequestIdGet(reqID).then((data: UserRoleRequest) => {
                console.log(data);
                setRequest(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);
    
    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
    } else if (error) {
        return <DisplayPVDServerError error={error} />;
    }
    else if(request){
        return (<>
            {/* <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deleting request'} 
                body={<>Are you sure you would like to delete <b>{request?.first_name}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            /> */}
            <BackButton />
            <DisplayRoleRequest request={request} />
            {/* <DeleteButton />
            <EditButton /> */}
        </>);
    }
    else {
        return <DisplayInfoLoading/>;
    }
}

export default ViewRoleRequest;