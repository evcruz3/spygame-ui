import { APIClient, ApiError, OpenAPI, InstitutionProfileDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    DisplayInfoLoading,
    DisplayPVDServerError,
    DisplayTable,
    Hyperlink,
    DisplayAccessDenied
} from '../../components/display';
import { Button } from '../../components/input';
import { ColumnData, Renderer } from '../../components/display/DisplayTable';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @prop institutions   List of institutions to be displayed in table form.
 * @prop colHeaders     Data on the headers of the institution table to be displayed.
 * @returns A DisplayTable element that displays the list of institutions with an edit and delete button each entry.
 */
function DisplayInstitutions(props: {institutions: InstitutionProfileDocument[], colHeaders: ColumnData<InstitutionProfileDocument>[]}) {
    return (<>
        <DisplayTable data={props.institutions} columns={props.colHeaders}/>
    </>);
}

/**
 * @returns Corresponding page to display depending on whether the institutions have been retrieved.
 */
function ViewInstitutions() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [dataTable, setDataTable] = useState<InstitutionProfileDocument[]>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const location = useLocation();
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        console.log(location.state);
       client.institutions.viewAllInstitutionsInstitutionsGet().then((data: InstitutionProfileDocument[]) => {
            console.log(data);
            setDataTable(data);
        }).catch((error: ApiError) => {
            setError(error);
        });
    }, [location.state]);

    const columnHeaders: ColumnData<InstitutionProfileDocument>[] = [
        { heading: 'id', renderer: ((data: InstitutionProfileDocument) => <Hyperlink to={data._id} replace={false}>{data._id}</Hyperlink>) as Renderer},
        { heading: 'Institution', value: 'institution_name' },
    ];

    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
    } else if (error) {
        // If no institutions are found, simply display no institutions.
        if (error.status == 404) {
            return <Button purpose='primary' onClick={() => navigate('add')}>Add Institution</Button>;
        } 
        return <DisplayPVDServerError error={error} />;
    } else if(dataTable) {
        return (
            <>
                <DisplayInstitutions institutions={dataTable} colHeaders = {columnHeaders} />
                <Button purpose='primary' onClick={() => navigate('add')}>Add Institution</Button>
            </>);
    } else {
        return <DisplayInfoLoading />;
    }
}

export default ViewInstitutions;
