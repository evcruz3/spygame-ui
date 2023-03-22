import {  useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import { SingleProjectLayout } from ".";
import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, ProjectRole, UserProfileDocument, UserProjectRoleDocument } from "../../client";
import { Chip, DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTable, Modal, Hyperlink } from "../../components/display";
import { ColumnData, Renderer } from "../../components/display/DisplayTable";
import { Button, Form, Multiselect } from "../../components/input";
import { RedConfirmModal } from "../../components/display/Modal";
import useUserRoleSwitcher from "../../providers/user-role-switcher/useUserRoleSwitcher";

const roles = Object.values(ProjectRole);

function EditMember(props: {member: UserProjectRoleDocument|undefined, client: APIClient, projID: string}) {
    const client = props.client
    const memRoles = props.member && props.member.role ? props.member.role : [];
    const initialRoles = roles.reduce((acc,role) => ({...acc, [role]:(memRoles.includes(role) ? true : false)}), {});
    const memName = props.member ? props.member.user_id.first_name + " " + props.member.user_id.last_name : ""
    const options = [
        {name: "add_members", label: "Add Members", renderer: (data: string) => <Hyperlink to={data} replace={false}>{data}</Hyperlink>},
        {name: "edit_members", label: "Edit Members"},
        {name: "remove_members", label: "Remove Members"},
        {name: "add_seq", label: "Add Sequences"},
        {name: "submit_seq", label: "Submit Sequences"},
        {name: "edit_seq", label: "Edit Sequences"},
        {name: "delete_seq", label: "Delete Sequences"},
        {name: "edit_project", label: "Edit Project"},
        {name: "delete_project", label: "Delete Project"}
    ]

    const { 
        register, 
        handleSubmit,
        reset,
        formState: { 
            errors,
        },
    } = useForm<UserProjectRoleDocument>({
        defaultValues: useMemo(() => {
            return initialRoles;
        }, [props.member]),
    });

    useEffect(() => {
        reset(initialRoles);
    }, [props.member])

    const onSubmit = (data: any) => {
        const newRoles = Object.keys(data).reduce((acc,role) => (data[role] ? acc.concat(role) : acc), [] as string[])
        const newMem = {...(props.member), role:newRoles} as UserProjectRoleDocument
        const user_id = props.member!.user_id._id;
        console.log(newMem)
        client.projects.putProjectMemberProjectsProjectIdMembersUserIdPut(props.projID, user_id, newMem).then((data: UserProjectRoleDocument) => {
            // Handle successful profile update
            console.log(data);
            window.location.reload();
        }).catch((error: ApiError) => {
            // Handle API Error
            console.log(error)
        }); 
    }
        // {heading: '', renderer: "delete"},


    return <>
        <Modal header={"Editing Member Permissions"} verticallyCentered={true} modalName="memberPermissions">
            <Form title={memName} method='put'
            onSubmit={handleSubmit(onSubmit)} >
                <Multiselect options={options} register={register} label="Project Roles" />
                <Button purpose='primary' type="submit">Save</Button>
            </Form>
        </Modal>
    </>
}

function ViewAccessSettings() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [projectMembers, setProjectMembers] = useState<Array<UserProjectRoleDocument>>();
    const [projectName, setProjectName] = useState<string>("");
    const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();
    const [error, setError] = useState<ApiError>();
    const [clickedRow, setClickedRow] = useState<UserProjectRoleDocument>();
    const [isMember, setIsMember] = useState<boolean>(undefined)
    const navigate = useNavigate();
    const projID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();
    const allowedRoles = [ProjectRole.ADD_MEMBERS, ProjectRole.EDIT_MEMBERS, ProjectRole.REMOVE_MEMBERS];

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.projects.viewProjectProjectsProjectIdGet(projID)
            .then((data: ProjectProfileDocument) => {
                setProjectName(data.project_title);
                return client.projects.getAllProjectMembersProjectsProjectIdMembersGet(projID, 0);
            }).then((data: Array<UserProjectRoleDocument>) => {
                setProjectMembers(data);
            }).catch((error: ApiError) => setError(error)) 
        }
    }, [auth.user]);

    useEffect(() => {
        if (projectMembers) {
            client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub)
            .then((data: UserProfileDocument) => {
                const foundMember = projectMembers?.find((mem) => mem.user_id._id == data._id)
                setCurrentMember(foundMember);
                setIsMember(foundMember == undefined ? false : true)
                // setCurrentMember(projectMembers?.find((mem) => mem.user_id._id == data._id));
                // console.log("mel",currentMember);
            });
        }
    }, [projectMembers])

    function MembersList(props: {project_members: Array<UserProjectRoleDocument>}) {
        const colHeaders: ColumnData<UserProjectRoleDocument>[] = [
            {heading: 'Member', renderer: ((mem: UserProjectRoleDocument) => {return (mem.user_id.first_name + ' ' + mem.user_id.last_name)}) as Renderer},
            {heading: 'Position', value: 'position'},
            {heading: 'Sequence Permissions', renderer: ((mem: UserProjectRoleDocument) => {
                return (mem.role!.filter((role: ProjectRole) => role.includes("seq"))).map((role: ProjectRole) => { return <Chip>{role.slice(0, -4)}</Chip>; });
            }) as Renderer},
            {heading: 'Member Permissions', renderer: ((mem: UserProjectRoleDocument) => {
                return (mem.role!.filter((role: ProjectRole) => role.includes("members"))).map((role: ProjectRole) => {return <Chip>{role.slice(0,-8)}</Chip>})
            }) as Renderer},
            {heading: 'Project Permissions', renderer: ((mem: UserProjectRoleDocument) => {
                return (mem.role.filter((role: ProjectRole) => role.includes("project"))).map((role: ProjectRole) => {return <Chip>{role.slice(0,-8)}</Chip>})
            }) as Renderer},
            {heading: '', renderer: ((mem: UserProjectRoleDocument) => {
                return <Button purpose={"link"} data-bs-toggle="modal" data-bs-target={"#memberPermissions"} onClick={() =>{setClickedRow(mem)}}>Edit</Button>
            }) as Renderer},
            {heading: '', renderer: ((mem: UserProjectRoleDocument) => {
                return <Button purpose='danger' data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" onClick={() =>{setClickedRow(mem.user_id._id)}}>Remove</Button>
                
                // <Button purpose='primary' onClick={() => {navigate('add')}}>Add a Member</Button>
            }) as Renderer},
        ];
        return <>
            <DisplayTable data={props.project_members} columns={colHeaders}/>
        </>;
    }

    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if(isMember == undefined) {
        return <DisplayInfoLoading/>;
    }
    else if (!isMember) {
        return <DisplayAccessDenied
            reason="Only members of this project may view this page." 
            action="Please request access from a project member with member permission access roles." />
    } else if (currentMember && !((allowedRoles.filter((role: ProjectRole) => currentMember.role!.includes(role))).length)) {
        return <DisplayAccessDenied required_role={allowedRoles} 
            reason="Only those with the following permissions may view this page:" 
            action="Please request access from a project member with member permission access roles."/>
    } else if (error) {
        return <DisplayPVDServerError error={error} />;
    }
    else if(projectMembers){
        return (<>
            <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Removing Project Member'} 
                body={<>Are you sure you would like to remove this user from the project members?</>} 
                action={(() => navigate(clickedRow+'/delete'))}
            />
            
            <SingleProjectLayout proj_id={projID} proj_title={projectName} floatingActionButton={<Button purpose='primary' onClick={() => {navigate('add')}}>Add a Member</Button>}>
                <MembersList project_members={projectMembers}/>
                <EditMember member={clickedRow} client={client} projID={projID}/>
                
            </SingleProjectLayout>
            </>)
    }
    else {
        return <DisplayInfoLoading/>;
    }
}

export default ViewAccessSettings;