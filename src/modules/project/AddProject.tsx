import { APIClient, OpenAPI, ApiError, ProjectProfileDocument } from '../../client';
import { useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { DisplayAccessDenied, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, TextInput, Form, FormRow } from '../../components/input';
import { BackButton } from '../../components/input/Button';
import { useNavigate, Navigate } from "react-router-dom";
import { unsetIfEmpty } from '../../utils/inputs';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @returns A form for adding an project to the database.
 */
function AddProject() {
    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [projectUpdated, setProjectUpdated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isValid,
            isDirty
        },
        watch
    } = useForm<ProjectProfileDocument>({
        mode: "onBlur"});
        const navigate = useNavigate();
        const userRoleSwitcher = useUserRoleSwitcher();

        /**
         * Attempts to create the project record at the server.
         * 
         * @prop data Object containing all the fields needed to create a project record.
         */

    const onSubmit = (data: ProjectProfileDocument) => {
        setSubmitError(undefined);
        data.user_id = [];
        console.log(data);
        client.projects.createProjectProjectsPost(data).then((updated_project: ProjectProfileDocument) => {
            // Handle successful profile update
            setProjectUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        });
    }

    const onError: SubmitErrorHandler<ProjectProfileDocument> = (errors: FieldErrorsImpl<DeepRequired<ProjectProfileDocument>>) => {
         // Do nothing
        console.log(errors)
    }

    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
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

    // If profile is successfully created, go back to /institutions.
    if (projectUpdated) {
        return <Navigate to="../"/>;
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="addProj" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;
    const projName = watch("project_title");;

    return <>
        <Modal 
            header={'New Project'} 
            body={<>Would you like to add <b><u>{projName}</u></b> to the database of projects?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <BackButton />
        <Form title='Add a Project'
            id="addProj"
            method='post'
            onSubmit={handleSubmit(onSubmit, onError)} onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}>
            <FormRow>
                <TextInput flex='flex-grow' label="Project Title" {...register("project_title", { required: true })} errors={errors} readOnly={false}/>
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[2]' label="Implementing Institution" {...register("implementing_institution", { required: true })} errors={errors} />
                <TextInput flex='grow-[2]' label="Funding Institution" {...register("funding_institution", { required: true })} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[2]' label="Project Start Date" {...register("project_start_date", { 
                    required: true, 
                    pattern: {
                        value: /[0-9][0-9]+\/+[0-9][0-9]+\/+[0-9][0-9][0-9][0-9]/, 
                        message: "Please input format MM/DD/YYYY"
                        }
                    })
                    } errors={errors} readOnly={false} placeholder="MM/DD/YYYY" />
                
                
                <TextInput flex='grow-[2]' label="Project End Date" {...register("project_end_date", { 
                    required: true, 
                    pattern: {
                        value: /[0-9][0-9]+\/+[0-9][0-9]+\/+[0-9][0-9][0-9][0-9]/, 
                        message: "Please input format MM/DD/YYYY"
                        }
                    })
                    } errors={errors} readOnly={false} placeholder="MM/DD/YYYY" />
            </FormRow>
            {/* <FormRow>
                <TextInput flex='grow' label="User ID" {...register("user_id")} errors={errors} />
            </FormRow> */}
            
           
            <FormRow>
                <Button purpose='primary' type='button' disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
            </FormRow>
        </Form>
    </>;
}

export default AddProject;
