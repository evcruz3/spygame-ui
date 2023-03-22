import { Link, useParams } from "react-router-dom";
import { APIClient, ApiError, OpenAPI, DraftSequenceDocument, ProjectProfileDocument} from '../../client';
import { BackButton } from '../../components/input/Button';
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
import { project } from "..";
import SingleProjectLayout from "./SingleProjectLayout";

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
    const [project, setProject] = useState<ProjectProfileDocument>();
    const projID = useParams().id!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const location = useLocation();

    
    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.submittedSequences.getAllSubmittedSequencesSequencesSubmittedGet().then((data: DraftSequenceDocument[]) => {
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

    const column = [
        { heading: 'Accession No.', value: 'accession_no', renderer: (data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>},
        { heading: 'Title', value: 'title' },
    ]

    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (error) {
        if (error.status == 404) {
            // if there is no project, Add a Project.
            return (
                <>
                    <p>There are no newly sumbitted sequences.</p>
                </>
            );
        } 
        return <DisplayPVDServerError error={error} />;
    } else if (project) {
        return (<>
            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                {/* <p>Registered Draft Sequences</p> */}
                <DisplayDrafts drafts={draft} colHeaders= {column}/>
            </SingleProjectLayout>
            </>
        );
    }
}

export default ViewDrafts;
