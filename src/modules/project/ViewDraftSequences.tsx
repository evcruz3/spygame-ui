import { Link, useParams } from "react-router-dom";
import { APIClient, ApiError, OpenAPI, DraftSequenceDocument, ProjectProfileDocument, UserProfileDocument, UserProjectRoleDocument, ProjectRole, BioseqSetCreationDocument, BioseqSetCreationRequest} from '../../client';
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
    Hyperlink,
    Modal
} from '../../components/display';

import {
    Button, Form, TextInput
} from '../../components/input';
import { project } from "..";
import SingleProjectLayout from "./SingleProjectLayout";
import { useForm } from "react-hook-form";

function DisplayDrafts(props: {drafts: any,colHeaders: any}) {
    if (props.drafts) {
        const drafts = props.drafts;
        return (
            <>
                 <DisplayTable data={props.drafts} columns={props.colHeaders} primaryKey='_id'/>
            </>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewDrafts() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [draft, setDraft] = useState<BioseqSetCreationDocument[]>();
    const [project, setProject] = useState<ProjectProfileDocument>();
    const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();
    const projID = useParams().id!;
    // const creationID = useParams().creationId!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const location = useLocation();

    
    
    const { 
        register, 
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<BioseqSetCreationRequest>({
        mode: "onBlur"});

    const onSubmit = (data: BioseqSetCreationRequest) => {
        client.projects.createDraftSequenceCreationProjectsProjectIdDraftCreationsPost(projID, data).then((data) => {
            console.log(data)
            const draftID = data._id;
            navigate(draftID+'/edit');
        });
    }
        

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsGet(projID).then((data: BioseqSetCreationDocument[]) => {
                console.log("creation", data);
                data.forEach(function(obj) {
                    obj["create_date"] = new Date(obj["create_date"]).toLocaleDateString();
                    obj["edited_date"] = new Date(obj["edited_date"]).toLocaleDateString();
                })
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
                return client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub);
            }).then((data: UserProfileDocument) => {
                return client.projects.getSingleProjectMemberProjectsProjectIdMembersUserIdGet(projID, data._id!);
            }).then((data: UserProjectRoleDocument) => {
                setCurrentMember(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);

    const column = [
        // { heading: 'Accession No.', value: 'accession_no', renderer: (data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>},
        // { heading: 'Title', value: 'title' },
        { heading: 'Creation ID', value: '_id', renderer: (data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>},
        { heading: 'Creation Name', value: 'creation_name' },
        { heading: 'Date Created', value: 'create_date' },
        { heading: 'Last Edited', value: 'edited_date' },
        { heading: '', renderer: 'edit'},
        { heading: '', renderer: 'delete'}
    ]

    // const showCreateDraft = true;

    // const createDraft = <>
    //             <Modal header={"Creating a New Draft"} 
    //                     modalName="createDraft"
    //                     buttons = {[
    //                         <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Cancel</Button>,
    //                         <Button purpose={"primary"} data-bs-dismiss="modal" type="submit" form="createDraftForm">Create Draft</Button>
    //                     ]}
    //                 >
    //                     <Form title="" id="createDraftForm" method="post" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}    >
    //                         <TextInput errors={errors} label="Draft Name" {...register("creation_name")}/>
    //                     </Form>
    //             </Modal>
    //             <Button purpose={"primary"} data-bs-toggle="modal" data-bs-target={"#createDraft"}>Create Draft</Button>
    //         </>
    
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
    } else if (project) {
        const actionButton = currentMember && currentMember?.role?.includes(ProjectRole.ADD_SEQ) ? 
            <Button purpose={"primary"} data-bs-toggle="modal" data-bs-target={"#createDraft"}>Create Draft</Button>
        : <></>


        return (<>
            <Modal header={"Creating a New Draft"} 
                    modalName="createDraft"
                    buttons = {[
                        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Cancel</Button>,
                        <Button purpose={"primary"} data-bs-dismiss="modal" type="submit" form="createDraftForm">Create Draft</Button>
                    ]}
                >
                    <Form title="" id="createDraftForm" method="post" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}    >
                        <TextInput errors={errors} label="Draft Name" {...register("creation_name")}/>
                    </Form>
            </Modal>
            <SingleProjectLayout proj_id={projID} proj_title={project?.project_title ?? ""} floatingActionButton={actionButton}>
                <DisplayDrafts drafts={draft} colHeaders= {column}/>
            </SingleProjectLayout>
            
            </>
        );
    }
}

export default ViewDrafts;
