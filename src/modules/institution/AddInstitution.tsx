import { APIClient, OpenAPI, ApiError, InstitutionProfileDocument } from '../../client';
import { useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { DisplayAccessDenied, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, TextInput, Form, FormRow  } from '../../components/input';
import { useNavigate, Navigate } from 'react-router-dom';
import { unsetIfEmpty } from '../../utils/inputs';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @returns A form for adding an institution to the database.
 */
function AddInstitution() {
    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [profileUpdated, setProfileUpdated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isValid,
            isDirty,
        },
        watch
    } = useForm<InstitutionProfileDocument>({mode: "onBlur"});
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();

    /**
     * Attempts to create the institution record at the server.
     * 
     * @prop data Object containing all the fields needed to create an Institution record.
     */
    const onSubmit = (data: InstitutionProfileDocument) => {
        setSubmitError(undefined);
        client.institutions.createInstitutionInstitutionsPost(data).then((updated_profile: InstitutionProfileDocument) => {
            // Handle successful profile update
            setProfileUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<InstitutionProfileDocument> = (errors: FieldErrorsImpl<DeepRequired<InstitutionProfileDocument>>) => {
        // Do nothing
        console.log(errors)
    }

    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
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
    if (profileUpdated) {
        return <Navigate to="../"/>;
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="addInsti" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;
    const instiName = watch("institution_name");;

    return <>
        <Modal 
            header={'New Institution'} 
            body={<>Would you like to add <b><u>{instiName}</u></b> to the database of institutions?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <Form title='Add Institution'
            id="addInsti"
            method='post'
            onSubmit={handleSubmit(onSubmit, onError)}
            onKeyDown={(e) => {if (e.code === 'Enter') e.preventDefault();}}>
            <FormRow>
                <TextInput flex='grow-[3]' label="Institution Name" {...register("institution_name", { required: true })} errors={errors} readOnly={false} />
                <TextInput flex='grow-[3]' label="Parent Institution" {...register("parent_institution", { 
                    required: false, 
                    setValueAs: unsetIfEmpty 
                })} errors={errors} readOnly={false} />
            </FormRow>
            <FormRow>
                <TextInput flex='flex-grow' label="Institution Address" {...register("institution_address", { required: true })} errors={errors} readOnly={false} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[3]' label="Contact Email" {...register("email", {
                    required: true, 
                    pattern: {
                        value: /\S+@\S+\.\S+/, 
                        message: "Please enter a valid email."} 
                })} errors={errors} readOnly={false} />
                <TextInput flex='grow-[3]' label="Contact Number" {...register("phone", { 
                    required: true, 
                    pattern: {
                        value: /[0-9]+/, 
                        message: "Please enter numbers only."
                }})} errors={errors} readOnly={false} />
            </FormRow>
            <FormRow>
            <Button purpose='primary' type='button' disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
            </FormRow>
        </Form>
    </>
}


export default AddInstitution;
