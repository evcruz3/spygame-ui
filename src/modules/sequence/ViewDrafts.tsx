import { Link } from "react-router-dom";
import { APIClient, ApiError, OpenAPI, DraftSequenceDocument} from '../../client';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

import {
    DisplayAccessDenied,
    DisplayInfoLoading,
    DisplayPVDServerError,
    DisplayTable,
    Hyperlink
} from '../../components/display';

import {
    Button
} from '../../components/input';

function DisplayDrafts(props: {drafts: any,colHeaders: any}) {
    if (props.drafts) {
        const drafts = props.drafts;
        return (
            <>
                 <DisplayTable data={props.drafts} columns={props.colHeaders} primaryKey='accession_no'/>
            </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewDrafts() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [draft, setDraft] = useState<DraftSequenceDocument[]>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const location = useLocation();

    
    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.draftSequences.getAllDraftSequencesSequencesDraftsGet().then((data: DraftSequenceDocument[]) => {
                console.log(data);
                setDraft(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);

    const column = [
        { heading: 'Accession No.', value: 'accession_no', renderer: (data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>},
        { heading: 'Title', value: 'title' },
        { heading: '', renderer: 'edit' },
        { heading: '', renderer: 'delete' }
    ]

    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (error) {
        if (error.status == 404) {
            // if there is no project, Add a Project.
            return (
                <>
                    <p>There are no registered draft sequences.</p>
                    <Button purpose='primary' onClick={() => navigate('add')}>Add a Draft Sequence</Button>
                </>
            );
        } 
        return <DisplayPVDServerError error={error} />;
    } else {
        return (
            <>
                <p>Registered Draft Sequences</p>
                <DisplayDrafts drafts={draft} colHeaders= {column} />
                <Button purpose='primary' onClick={() => {navigate('add')}}>Add a Draft Sequence</Button>
            </>
        );
    }
}

export default ViewDrafts;
