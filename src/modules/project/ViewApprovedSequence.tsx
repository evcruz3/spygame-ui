import { APIClient, ApiError, OpenAPI, DraftSequenceDocument, ProjectProfileDocument, ApprovedSequenceDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import Button, { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import Sidebar from '../../layout/Sidebar';
import SingleProjectLayout from './SingleProjectLayout';

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
                <li><DisplayTextInfo label="Time Approved" value={draft.time_approved} /></li>
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
    const [draft, setDraft] = useState<ApprovedSequenceDocument>();
    const [project, setProject] = useState<ProjectProfileDocument>();
    const projID = useParams().id!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const appAcc = useParams().acc!;

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.approvedSequences.getOneApprovedSequenceSequencesApprovedAccGet(appAcc).then((data: ApprovedSequenceDocument) => {
                console.log(data);
                setDraft(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectProjectsProjectIdGet(projID).then((data: ProjectProfileDocument) => {
                console.log(data);
                setProject(data);
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
    else if (project){
        return (<>
           <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deleting Project'} 
                body={<>Are you sure you would like to permanently delete <b>{draft?.accession_no}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            />

            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                <DisplayDraft draft={draft} />
            </SingleProjectLayout>
        </>)
    }
}

export default ViewDraft;