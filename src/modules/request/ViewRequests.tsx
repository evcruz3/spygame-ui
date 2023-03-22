import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, UserProfileUpdateRequest} from '../../client';
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
import { institution } from '..';

function DisplayRequest(props: {requests: any,colHeaders: ColumnData<UserProfileUpdateRequest>[]}) {
    const userRoleSwitcher = useUserRoleSwitcher();
    console.log(userRoleSwitcher?.activeRole);

    if (props.requests) {
        // const requests = props.requests;
        return (
            <>
            <DisplayTable data={props.requests} columns={props.colHeaders} />
       </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewRequests() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [request, setUpdateRequest] = useState<UserProfileUpdateRequest[]>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const location = useLocation();
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.viewAllUserProfileUpdateRequestsUsersUpdateRequestsGet().then((data: UserProfileUpdateRequest[]) => {
                console.log(data);
                setUpdateRequest(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);


    const columnHeaders : ColumnData<UserProfileUpdateRequest>[] = [
        { heading: 'id', value: '_id', renderer: ((data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>) as Renderer},
        { heading: 'Affiliation',  value: 'affiliation.institution_name' },
        { heading: 'First Name', value: 'first_name' },
        { heading: 'Last Name', value: 'last_name'},
        { heading: '', renderer: 'approve'},
        { heading: '', renderer: 'reject'}
    ]
    if(userRoleSwitcher.activeRole != 'pvd-super-admin' && userRoleSwitcher.activeRole != 'pvd-site-admin') {
        return <DisplayAccessDenied required_role={["pvd-super-admin", "pvd-site-admin"]} />;
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
                <DisplayRequest requests={request} colHeaders= {columnHeaders} />
                
            </>);
    }

}

export default ViewRequests;