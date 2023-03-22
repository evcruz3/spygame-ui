import { APIClient, ApiError, OpenAPI, DraftSequenceDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

function DisplayDraft(props: {draft: DraftSequenceDocument | any}) {
    if (props.draft) {
        const draft = props.draft;
        return <>
            <RedConfirmModal header={'Deleting this draft sequence'} body={`Are you sure you want to delete ${draft.accession_no} from our records?`}/>
            <ul>
                <li><DisplayTextInfo label="Accession No." value={draft.accession_no} /></li>
                <li><DisplayTextInfo label="Title" value={draft.title} /></li>
                <li><DisplayTextInfo label="Sequence" value={draft.sequence} /></li>
                <li><DisplayTextInfo label="Region" value={draft.metadata.region} /></li>
                <li><DisplayTextInfo label="Collection Date" value={draft.metadata.collection_date} /></li>
                <li><DisplayTextInfo label="Time Created" value={draft.time_created} /></li>
                <li><DisplayTextInfo label="Time Last Updated" value={draft.time_last_updated} /></li>
                <li><DisplayTextInfo label="Status" value={draft.status} /></li>
            </ul>
        </>
    }
    else {
        return <DisplayInfoLoading />;
    }
}

function ViewDraft() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [draft, setDraft] = useState<DraftSequenceDocument>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const draftAcc = useParams().acc!;

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.draftSequences.getDraftSequenceSequencesDraftsAccGet(draftAcc).then((data: DraftSequenceDocument) => {
                console.log(data);
                setDraft(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);
    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if(error) {
        return <DisplayPVDServerError error={error} />;
    }
    else {
        return (<>
            <BackButton />
            <DisplayDraft draft={draft} />
            <DeleteButton />
            <EditButton />
        </>)
    }
}

export default ViewDraft;