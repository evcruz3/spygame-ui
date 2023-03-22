
import { useAuth } from 'react-oidc-context';
import { APIClient, OpenAPI, ApiError, ProjectProfileDocument } from '../../client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { unsetIfEmpty } from '../../utils/inputs';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, Form, FormRow, TextInput } from '../../components/input';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { BackButton, DeleteButton } from '../../components/input/Button';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';
import Sidebar from '../../layout/Sidebar';
import { RedConfirmModal } from '../../components/display/Modal';
import SingleProjectLayout from './SingleProjectLayout';


function EditProfileForm(props: {initialProfile: ProjectProfileDocument}) {
    const initialProfile = props.initialProfile;

    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [profileUpdated, setProfileUpdated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isDirty,
            isValid
        }
    } = useForm<ProjectProfileDocument>({
        mode: "onBlur",
        defaultValues: initialProfile,
    });
    const navigate = useNavigate();
    const projID = useParams().id!

    const onSubmit = (data: ProjectProfileDocument) => {
        setSubmitError(undefined);
        client.projects.updateProjectProjectsProjectIdPatch(projID, data).then((updated_profile: ProjectProfileDocument) => {
            // Handle successful profile update
            setProfileUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<ProjectProfileDocument> = (errors: FieldErrorsImpl<DeepRequired<ProjectProfileDocument>>) => {
        // Do nothing
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="editProj" data-bs-dismiss="modal">Confirm</Button>
    ];
    const disableSubmit = !isDirty || !isValid;
    const projName = initialProfile.project_title;

    
    if (submitError) {
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

        if(submitError.status == 500) {
            return <>
                <div className="bg-red-400 rounded-lg p-5 mb-5">
                    <h2 className="mb-2 text-2xl font-semibold">Server Error!</h2>
                    There was an error writing data to the database. Please try again.
                </div>
                <Button purpose={'link'} onClick={(e) => navigate(0)}>Try Again</Button>
            </>
        }

        return <DisplayPVDServerError error={submitError}/>;
    }

    if (profileUpdated) {
        return <Navigate to={'../'}/>

    }

    return <>
        <Modal header={'Updating Project'} body={<>Would you like to update our record of <b><u>{projName}</u></b>?</>} modalName="submitConfirmation" buttons={buttons}/>
        <Form title='Update Project'
            id="editProj"
            method='put'
            onSubmit={handleSubmit(onSubmit, onError)}
            onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}>
            <FormRow>
                <TextInput flex='grow-[3]' label="Project Title" {...register("project_title", { required: true })} errors={errors} readOnly={false} />
                <TextInput flex='grow-[3]' label="Implementing Institution" {...register("implementing_institution", { required: false })} errors={errors} readOnly={false} />
                <TextInput flex='grow-[2]' label="Funding Institution" {...register("funding_institution", { required: true })} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[2]' label="Project Start Date" {...register("project_start_date")} errors={errors} />
                <TextInput flex='grow-[2]' label="Project End Date" {...register("project_end_date")} errors={errors} />
            </FormRow>
            {/* <FormRow>
                <TextInput flex='grow' label="User ID" {...register("user_id")} errors={errors} readOnly={true} />
            </FormRow> */}

            <FormRow>
            <Button purpose='primary' type='button' disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
            </FormRow>
        </Form>
    </>
}

function EditProject() {
    const client = new APIClient(OpenAPI);
    const [initialProfile, setInitialProfile] = useState<ProjectProfileDocument>();
    const [getProfileError, setGetProfileError] = useState<ApiError>();
    const projID = useParams().id!;
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();

    // fetch initial profile if available
    useEffect(() => {
        client.projects.viewProjectProjectsProjectIdGet(projID).then((profile: ProjectProfileDocument) => {
             setInitialProfile(profile);
        }).catch((error: ApiError) => {
            setGetProfileError(error);
        });
    }, []);
    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if(initialProfile) {
        return (<>
            <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deleting Project'} 
                body={<>Are you sure you would like to delete <b>{initialProfile?.project_title}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            />

            <SingleProjectLayout proj_id={projID} proj_title={initialProfile.project_title} footer={<Button purpose='danger' data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Delete Project</Button>}>
                <EditProfileForm initialProfile={initialProfile} />
                {/* <div className="py-2"><Button purpose='danger' data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Delete</Button></div> */}
            </SingleProjectLayout>
        </>)
    } else if (getProfileError) {
        return <DisplayPVDServerError error={getProfileError} /> 
    } else {
        return <DisplayInfoLoading />
    }
}

export default EditProject;