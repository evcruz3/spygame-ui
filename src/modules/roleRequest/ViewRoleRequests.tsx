import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, UserProfileUpdateRequest, UserRoleRequest} from '../../client';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import {
    DisplayInfoLoading,
    DisplayPVDServerError,
    DisplayTable,
    Hyperlink,
    DisplayAccessDenied
} from '../../components/display';

import {
    Button
} from '../../components/input';

import { 
    ColumnData, Renderer 
} from '../../components/display/DisplayTable';

import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import { BackButton } from '../../components/input/Button';
import { Home } from '../../layout/pages';

function DisplayRoleRequest(props: {requests: any,colHeaders: ColumnData<UserRoleRequest>[]}) {
    const userRoleSwitcher = useUserRoleSwitcher();
    console.log(userRoleSwitcher?.activeRole);

    if (props.requests) {
        // const requests = props.requests;
        return (
            <>
            <DisplayTable data={props.requests} columns={props.colHeaders}/>
       </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewRoleRequests() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [request, setUpdateRequest] = useState<UserRoleRequest[]>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const location = useLocation();
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.viewAllUserRoleRequestsUsersRoleRequestsGet().then((data: UserRoleRequest[]) => {
                console.log(data);
                setUpdateRequest(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);

    const columnHeaders: ColumnData<UserRoleRequest>[] = [
        { heading: 'id', value: '_id', renderer: ((data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>) as Renderer},
        { heading: 'Name', value: 'oidc_user_id.first_name' },
        { heading: 'Status', value: 'status' },
        { heading: 'Role', value: 'role' },
        { heading: '', renderer: 'approve'},
        { heading: '', renderer: 'reject'}

    ]
    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role={["pvd-super-admin"]} />;
    } else if (error) {
        if (error.status == 404) {
            // if there is no request, redirect to update profile page.
            console.log("Error 404")
            return <Home />
        } 
        return <DisplayPVDServerError error={error} />;
    } else {
        return (
            <>
                {/* <BackButton /> */}
                <DisplayRoleRequest requests={request} colHeaders= {columnHeaders} />
                
            </>);
    }

}

export default ViewRoleRequests;