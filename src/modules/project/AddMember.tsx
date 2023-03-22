import { APIClient, OpenAPI, ApiError, UserProjectRoleDocument, ProjectProfileDocument, ProjectRole, UserProfileDocument, ProjectPosition } from '../../client';
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { DisplayAccessDenied, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, TextInput, Form, FormRow, Multiselect } from '../../components/input';
import { BackButton } from '../../components/input/Button';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { unsetIfEmpty } from '../../utils/inputs';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import CheckboxList from '../../components/input/Checkbox';

/**
 * @returns A form for adding an project member to the database.
 */
function AddMember() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [memberUpdated, setMemberUpdated] = useState<boolean>();
    const [projectMembers, setProjectMembers] = useState<Array<any>>();
    const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();
    const [projectName, setProjectName] = useState<string>("");
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const projID = useParams().id!;
    const allowedRoles = [ProjectRole.ADD_MEMBERS];
    const pos = Object.values(ProjectPosition);

    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isValid,
            isDirty
        },
        watch
    } = useForm<UserProjectRoleDocument>({
        mode: "onBlur",
        defaultValues: {
            project_id: projID,
            role: [],
        }});

        /**
         * Attempts to create the project member record at the server.
         * 
         * @prop data Object containing all the fields needed to create a project member record.
         */

        useEffect(() => {
            if (auth.user && auth.user.profile) {
                client.projects.viewProjectProjectsProjectIdGet(projID)
                .then((data: ProjectProfileDocument) => {
                    setProjectName(data.project_title);
                    return client.projects.getAllProjectMembersProjectsProjectIdMembersGet(projID, 0);
            }).then((data: Array<UserProjectRoleDocument>) => {
                // For each member, make a new object that includes their name
                const members = data.map((mem) => {
                    const userDoc = mem.user_id as UserProfileDocument;
                    return {
                        ...mem,
                        name: userDoc.first_name + " " + userDoc.last_name
                    }
                })
                setProjectMembers(members);
            }).catch((error: ApiError) => setSubmitError(error)) 
        }
    }, [auth.user]);

    useEffect(() => {
        if (projectMembers) {
            client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub)
            .then((data: UserProfileDocument) => {
                setCurrentMember(projectMembers?.find((mem) => mem.user_id._id == data._id));
            });
        }
    }, [projectMembers])


    const onSubmit = (data: UserProjectRoleDocument) => {
        setSubmitError(undefined);
        client.projects.putProjectMemberProjectsProjectIdMembersUserIdPut(projID, user_id.value, data).then(() => {
            // Handle successful profile update
            setMemberUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        });
    }

    const onError: SubmitErrorHandler<UserProjectRoleDocument> = (errors: FieldErrorsImpl<DeepRequired<UserProjectRoleDocument>>) => {
        console.log(errors)
    }

    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
        
    } else if (currentMember == undefined) {
        return <DisplayAccessDenied
            reason="Only members of this project may view this page." 
            action="Please request access from a project member with member permission access roles." />
 
    } else if (!((allowedRoles.filter((role: ProjectRole) => currentMember.role!.includes(role))).length)) {
        return <DisplayAccessDenied required_role={allowedRoles} 
            reason="Only those with the following permissions may view this page:" 
            action="Please request access from a project member with member permission access roles."/>
    
    } else if (submitError) {
        // Special error screen for 422 error. Includes try again button.
        if (submitError.status == 422) {
            const errorDetails = submitError.body.detail.map((details: {loc: string[], msg: string}) => {
                return <li><DisplayTextInfo label={details.loc[1]} value={details.msg} /></li>
            });

            return <>
                <div className="bg-red-400 rounded-lg p-5 mb-5">
                    <h2 className="mb-2 text-2xl font-semibold">Validation Error!</h2>
                    The following data sent to the database were invalid:
                    <ul>
                        {errorDetails}
                    </ul>
                </div>
                <Button purpose={'link'} onClick={(e) => navigate(0)}>Try Again</Button>
            </>

        }
         // Special error screen for 500 error. Includes try again button.
         if(submitError.status == 500) {
            return <>
                <div className="bg-red-400 rounded-lg p-5 mb-5">
                    <h2 className="mb-2 text-2xl font-semibold">Server Error!</h2>
                    There was an error writing data to the database. Please try again.
                </div>
                <Button purpose={'link'} onClick={(e) => navigate(0)}>Try Again</Button>
            </>
        }

        // Generic error screen.
        return <DisplayPVDServerError error={submitError}/>;
    }

    // If profile is successfully created, go back to /projects.
    if (memberUpdated) {
        return <Navigate to="../"/>;
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="addMember" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;
    const userName = watch("user_id");

    return <>
        <Modal 
            header={'Adding New Member'} 
            body={<>Would you like to add <b><u>{userName}</u></b> to the database of project members in project <b><u>{projectName}</u></b>?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <BackButton />
        <Form title='Add a Project Member'
            id="addMember"
            method='put'
            onSubmit={handleSubmit(onSubmit, onError)} onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}>
            
            <FormRow>
                <TextInput flex='flex-grow' label="Project ID" {...register("project_id", { required: true })} errors={errors} readOnly={true}/>
            </FormRow>
            <FormRow>
                <TextInput flex='grow' label="User ID" {...register("user_id", { required: true })} errors={errors} />
            </FormRow>
            <FormRow>
                {/* Dropdown box for position */}
                <label className="block text-gray-700 text-sm font-bold" htmlFor="position" >Position</label>
                <select {...register("position", {
                    setValueAs: unsetIfEmpty,
                    required: true
                    })} 
                    className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none disabled"
                >
                    <option value="" >Choose Position</option>
                    {pos?.map((index) => {return <option value={index}>{index}</option>}) }
                </select>
                
            </FormRow>
            <FormRow> 
                {/* CHECKBOXES FOR ROLES */}
                <label className="block text-gray-700 text-sm font-bold" htmlFor="role" >Roles</label>
                <div className='p-8'>
                <input
                    type='checkbox'
                    placeholder='Add Members'
                    {...register('role', {})}
                    className='mx-3'
                    value="add_members"
                />
                <label htmlFor=''>Add Members</label>

                <input
                    type='checkbox'
                    placeholder='Edit Members'
                    {...register('role', {})}
                    className='mx-3'
                    value="edit_members"
                />
                <label htmlFor=''>Edit Members</label>

                <input
                    type='checkbox'
                    placeholder='Remove Members'
                    {...register('role', {})}
                    className='mx-3'
                    value="remove_members"
                />
                <label htmlFor=''>Remove Members</label>

                <input
                    type='checkbox'
                    placeholder='Add Sequences'
                    {...register('role', {})}
                    className='mx-3'
                    value="add_seq"
                />
                <label htmlFor=''>Add Sequences</label>

                <input
                    type='checkbox'
                    placeholder='Submit Sequences'
                    {...register('role', {})}
                    className='mx-3'
                    value="submit_seq"
                />
                <label htmlFor=''>Submit Sequences</label>

                <input
                    type='checkbox'
                    placeholder='Edit Sequences'
                    {...register('role', {})}
                    className='mx-3'
                    value="edit_seq"
                />
                <label htmlFor=''>Edit Sequences</label>

                <input
                    type='checkbox'
                    placeholder='Delete Sequences'
                    {...register('role', {})}
                    className='mx-3'
                    value="delete_seq"
                />
                <label htmlFor=''>Delete Sequences</label>

                <input
                    type='checkbox'
                    placeholder='Edit Project'
                    {...register('role', {})}
                    className='mx-3'
                    value="edit_project"
                />
                <label htmlFor=''>Edit Project</label>

                <input
                    type='checkbox'
                    placeholder='Delete Project'
                    {...register('role', {})}
                    className='mx-3'
                    value="delete_project"
                />
                <label htmlFor=''>Delete Project</label>

                </div>       
                <FormRow>
                {/* <label className="block text-gray-700 text-sm font-bold" htmlFor="role" >Rolesss</label>
                <CheckboxList choices={Object.keys(ProjectRole).filter(key => isNaN(Number(key)))} checkboxName="role" register={register}/> */}
          </FormRow>

            </FormRow>

            <FormRow>
                <TextInput flex='grow-[2]' label="Start Date" {...register("startDate", { required: true })} errors={errors} />
                <TextInput flex='grow-[2]' label="End Date" {...register("endDate", { required: true })} errors={errors} />
            </FormRow>

            <FormRow>
                <Button purpose='primary' type='button' disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
            </FormRow>
        </Form>
    </>;
}

export default AddMember;