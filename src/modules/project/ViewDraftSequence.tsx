import { APIClient, ApiError, OpenAPI, DraftSequenceDocument, ProjectProfileDocument, BioseqSetCreationDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import Button, { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import SingleProjectLayout from './SingleProjectLayout';

function DisplayDraft(props: {draft: BioseqSetCreationDocument | any}) {
    if (props.draft) {
        const draft = props.draft;
        return <>
            <RedConfirmModal header={'Deleting this draft sequence'} body={`Are you sure you want to delete ${draft.creation_name} from our records?`}/>
            <ul>
                <li><DisplayTextInfo label="Creation Name" value={draft.creation_name} /></li>
                <li><DisplayTextInfo label="Created By" value={draft?.created_by.first_name} /></li>
                <li><DisplayTextInfo label="Create Date" value={draft.create_date} /></li>
                <li><DisplayTextInfo label="Last Edited" value={draft.edited_date} /></li>
                <li><DisplayTextInfo label="Last Edited by" value={draft?.edited_by.first_name} /></li>
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
    const [draft, setDraft] = useState<BioseqSetCreationDocument>();
    const [project, setProject] = useState<ProjectProfileDocument>();
    const projID = useParams().id!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const draftAcc = useParams().creationID!;

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsCreationIdGet(projID, draftAcc).then((data: BioseqSetCreationDocument) => {
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
                body={<>Are you sure you would like to permanently delete <b>{draft?.creation_name}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            />

            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                <DisplayDraft draft={draft} />
                <Button purpose='danger' data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Delete</Button>
                <EditButton />
            </SingleProjectLayout>
        </>)
    }
}

export default ViewDraft;