import { APIClient, ApiError, OpenAPI, UserProfileUpdateRequest } from '../../client';
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
function DisplayRequest(props: {request: UserProfileUpdateRequest}) {
        const req = props.request;
        return <>
            <RedConfirmModal
                header={'Deleting this request'} body={`Are you sure you want to delete ${req.first_name} from our records?`}
            />
            <ul>
                <li><DisplayTextInfo label="Request ID" value={req.oidc_user_id} /></li>
                <li><DisplayTextInfo label="User ID" value={req._id} /></li>
                <li><DisplayTextInfo label="First Name" value={req.first_name} /></li>
                <li><DisplayTextInfo label="Middle Name" value={req.middle_name} /></li>
                <li><DisplayTextInfo label="Last Name" value={req.last_name} /></li>
                <li><DisplayTextInfo label="Suffix" value={req.suffix} /></li>
                <li><DisplayTextInfo label="Organization" value={req.organization} /></li>
                <li><DisplayTextInfo label="Department" value={req.department} /></li>
                <li><DisplayTextInfo label="Region" value={req.region} /></li>
                <li><DisplayTextInfo label="Province" value={req.province} /></li>
                <li><DisplayTextInfo label="City/Municipality" value={req.city_municipality} /></li>
                <li><DisplayTextInfo label="Street Address" value={req.street_address} /></li>
                <li><DisplayTextInfo label="Contact Number" value={req.contact_number} /></li>
                <li><DisplayTextInfo label="Office Number" value={req.office_number} /></li>
                <li><DisplayTextInfo label="Email Address" value={req.email_address} /></li>
                <li><DisplayTextInfo label="Alternate Email Address" value={req.alt_email_address} /></li>
                <li><DisplayTextInfo label="Affiliation" value={req.affiliation?.institution_name} /></li>
                <li><DisplayTextInfo label="Status" value={req.status} /></li>
            </ul>
        </>
}
/**
 * @returns Corresponding page to display depending on whether the request is set.
 */
function ViewRequest() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [request, setRequest] = useState<UserProfileUpdateRequest>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const reqID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.viewUserProfileUsersUpdateRequestsRequestIdGet(reqID).then((data: UserProfileUpdateRequest) => {
                console.log(data);
                setRequest(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);
    
    if(userRoleSwitcher.activeRole != 'pvd-super-admin' && userRoleSwitcher.activeRole != 'pvd-site-admin') {
        return <DisplayAccessDenied required_role={["pvd-super-admin", "pvd-site-admin"]} />;
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
            <DisplayRequest request={request} />
            {/* <DeleteButton />
            <EditButton /> */}
        </>);
    }
    else {
        return <DisplayInfoLoading/>;
    }
}

export default ViewRequest;