import { Link, useParams } from "react-router-dom";
import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, ApprovedSequenceDocument} from '../../client';
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

function DisplaySequences(props: {sequences: any,colHeaders: any}) {
    const sequences = props.sequences;
    if (sequences) {
        return (
            <>
                 <DisplayTable data={sequences} columns={props.colHeaders} primaryKey='accession_no'/>
            </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewSequences() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [sequences, setSequences] = useState<ApprovedSequenceDocument[]>();
    const [project, setProject] = useState<ProjectProfileDocument>();
    const projID = useParams().id!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const location = useLocation();

    
    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.approvedSequences.getAllApprovedSequencesSequencesApprovedGet().then((data: ApprovedSequenceDocument[]) => {
                console.log(data);
                setSequences(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);

    useEffect(() => {
        if (auth.user && auth.user.profile && projID) {
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
        { heading: 'Date of Approval', value: 'time_approved'}
    ]

    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (error) {
        if (error.status == 404) {
            // if there is no project, Add a Project.
            return (
                <>
                    <p>There are no approved sequences.</p>                
                </>
            );
        } 
        return <DisplayPVDServerError error={error} />;
    } else if (project) {
        return (<>
            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                {/* <p>Registered Draft Sequences</p> */}
                <DisplaySequences sequences={sequences} colHeaders= {column}/>
            </SingleProjectLayout>
            </>
        );
    } else if (!projID) {
        return <DisplaySequences sequences={sequences} colHeaders={column}/>
    } else {
        return <DisplayInfoLoading/>
    }
}

export default ViewSequences;
