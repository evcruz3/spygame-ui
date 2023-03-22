import { APIClient, OpenAPI, ApiError, InstitutionProfileDocument} from '../../client';
import { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { unsetIfEmpty } from '../../utils/inputs';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, Form, FormRow, TextInput } from '../../components/input';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @prop initialProfile The institution's stored data.
 * @returns The Form element for editing an institution record.
 */
function EditProfileForm(props: {initialProfile: InstitutionProfileDocument}) {
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
    } = useForm<InstitutionProfileDocument>({
        mode: "onBlur",
        defaultValues: initialProfile,
    });
    const navigate = useNavigate();
    const instiID = useParams().id!

    const onSubmit = (data: InstitutionProfileDocument) => {
        setSubmitError(undefined);
        client.institutions.updateInstitutionInstitutionsInstitutionIdPatch(instiID, data).then((updated_profile: InstitutionProfileDocument) => {
            // Handles successful profile update.
            setProfileUpdated(true);
        }).catch((error: ApiError) => {
            // Handles API Error.
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<InstitutionProfileDocument> = (errors: FieldErrorsImpl<DeepRequired<InstitutionProfileDocument>>) => {
        // Do nothing.
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="editInsti" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;
    const instiName = initialProfile.institution_name;

    
    if (submitError) {
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
        return <Navigate to={'../'}/>

    }

    return <>
        <Modal 
            header={'Updating Institution'} 
            body={<>Would you like to update our record of <b><u>{instiName}</u></b>?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <Form title='Update Institution'
            id="editInsti"
            method='put'
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
                        message: "Please enter a valid email."
                } })} errors={errors} readOnly={false} />
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

/**
 * @returns Corresponding page to display depending on whether the initialProfile is set.
 */
function EditInstitution() {
    const client = new APIClient(OpenAPI);
    const [initialProfile, setInitialProfile] = useState<InstitutionProfileDocument>();
    const [getProfileError, setGetProfileError] = useState<ApiError>();
    const instiID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();

    // fetch initial profile if available
    useEffect(() => {
        client.institutions.viewInstitutionInstitutionsInstitutionIdGet(instiID).then((profile: InstitutionProfileDocument) => {
             setInitialProfile(profile);
        }).catch((error: ApiError) => {
            setGetProfileError(error);
        });
    }, []);
    
    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
    } else if(initialProfile) {
        return <EditProfileForm initialProfile={initialProfile} />
    } else if (getProfileError) {
        return <DisplayPVDServerError error={getProfileError} /> 
    } else {
        return <DisplayInfoLoading />
    }
}

export default EditInstitution;