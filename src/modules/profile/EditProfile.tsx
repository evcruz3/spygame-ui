import { useAuth } from 'react-oidc-context';
import { APIClient, OpenAPI, ApiError, UserProfileUpdateRequest, UserProfileDocument, InstitutionProfileDocument } from '../../client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { unsetIfEmpty } from '../../utils/inputs';
import { DisplayInfoLoading, DisplayPVDServerError } from '../../components/display';
import { Button, TextInput } from '../../components/input';
import { Form } from '../../components/input';
import { Link, useLocation } from "react-router-dom";
import { BackButton } from '../../components/input/Button';

// 
type FormRowProps = {
    children?: React.ReactNode,
    className?: string,
};

const FormRow = function(props: FormRowProps) {
    return (
        <div className={"flex flex-row flex-wrap justify-start pb-4 mb-4 gap-x-2 gap-y-4 border-gray-200 border-b " + props.className}>
            {props.children}
        </div>
    );
}

function EditProfileForm(props: {initialProfile: Partial<UserProfileUpdateRequest>}) {
    const initialProfile = props.initialProfile;

    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [profileUpdated, setProfileUpdated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
        },
    } = useForm<UserProfileUpdateRequest>({
        defaultValues: initialProfile,
    });


    const [dataTable, setDataTable] = useState<InstitutionProfileDocument[]>();
    // const [viewProfile, setViewProfile] = useState<UserProfileDocument>();

    const location = useLocation();

    const [profile, setUserProfile] = useState<UserProfileDocument>();
    const auth = useAuth();
    const [error, setError] = useState<ApiError>();
    // const navigate = useNavigate();

    useEffect(() => {
        console.log("fetching profile...")
        if (auth.user && auth.user.profile) {
            client.users.viewUserProfileUsersUserIdGet(auth.user.profile.sub).then((data: UserProfileDocument) => {
                setUserProfile(data);
            }).catch((error: ApiError) => {
                console.log("profile fetch error: ", error.status)

                if (error.status == 404){

                }
                else
                    setError(error);
            });
        }
    }, [auth.user]);

    useEffect(() => {
        // console.log(location.state);
       client.institutions.viewAllInstitutionsInstitutionsGet().then((data: InstitutionProfileDocument[]) => {
            // console.log(data);
            // console.log("This is me")
            setDataTable(data);
        });
    }, [location.state]);


    const onSubmit = (data: UserProfileUpdateRequest) => {
        setSubmitError(undefined);
        client.users.updateUserProfileUsersUpdateRequestsPost(data).then(() => {
            // Handle successful profile update
            // console.log(data);
            setProfileUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<UserProfileUpdateRequest> = (errors: FieldErrorsImpl<DeepRequired<UserProfileUpdateRequest>>) => {
        // Do nothing
    }

    if (error) {
        if (error.status != 403) {
            return <DisplayPVDServerError error={error}/>;
        }
        
    }
    if (submitError) {
        if (submitError.status == 422) {
            // TODO: handle error 422 separately if error is on form input. 
        }
        return <DisplayPVDServerError error={submitError}/>;
    }

    if (profileUpdated) {
        return (
            <>
                <p>Profile is updated!</p>
                <Link to="../">OK!</Link>
            </>
        );
    }

    return (
        <>
        <BackButton />
        <Form title='Update Profile'
            method='post'
            onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
                <TextInput flex='flex-grow' label="User ID" {...register("oidc_user_id", { required: true })} errors={errors} readOnly={true} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[3]' label="Last Name" {...register("last_name", { required: true })} errors={errors} />
                <TextInput flex='grow-[2]' label="First Name" {...register("first_name", { required: true })} errors={errors} />
                <TextInput flex='grow-[1]' label="Middle Name" {...register("middle_name")} errors={errors} />
                <TextInput flex='grow-0' label="Suffix" {...register("suffix")} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow' label="Organization" {...register("organization")} errors={errors} />
                <TextInput flex='grow' label="Department" {...register("department")} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-0' label="Region" {...register("region")} errors={errors} />
                <TextInput flex='grow' label="Province" {...register("province")} errors={errors} />
                <TextInput flex='grow' label="City/Municipality" {...register("city_municipality")} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow' label="Street Address" {...register("street_address")} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow-[1]' label="Contact Number" {...register("contact_number", { required: true })} errors={errors} />
                <TextInput flex='grow-[1]' label="Office Number" {...register("office_number", {
                    required: false,
                    setValueAs: unsetIfEmpty
                })} errors={errors} />
                <TextInput flex='grow-[1]' label="Email Address" {...register("email_address", { required: true })} errors={errors} />
                <TextInput flex='grow-[1]' label="Alternate Email Address" {...register("alt_email_address", {
                    required: false,
                    setValueAs: unsetIfEmpty
                })} errors={errors} />
            </FormRow>
            <FormRow>
                {profile?.affiliation && typeof(profile.affiliation) == "object" ?
                    <TextInput flex='grow' label="Affiliation" {...register("affiliation.institution_name")} errors={errors} readOnly={true}/>
                :
                    <select {...register("affiliation", {
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
                        <option value="" >Choose an Institution</option>
                        {dataTable?.map((insti) => {return <option value={insti._id}>{insti.institution_name}</option>}) }
                    </select>
                }
            </FormRow>
            <FormRow>
                <Button purpose='primary' type="submit">Save</Button>
            </FormRow>
        </Form>
        </>
    );
}

function EditProfile() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [initialProfile, setInitialProfile] = useState<UserProfileUpdateRequest>();
    const [getProfileError, setGetProfileError] = useState<ApiError>();

    // fetch initial profile if available
    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.viewUserProfileUsersUserIdGet(auth.user.profile.sub).then((profile: UserProfileDocument) => {
                setInitialProfile(profile);
            }).catch((error: ApiError) => {
                setGetProfileError(error);
            });
        }
    }, []);

    if (initialProfile) {
        return <EditProfileForm initialProfile={initialProfile} />
    } else if (getProfileError) {
        if (getProfileError.status == 404) {
            return <EditProfileForm initialProfile={{oidc_user_id: auth.user?.profile?.sub} as UserProfileUpdateRequest} />
        }
        return <DisplayPVDServerError error={getProfileError} />
    } else {
        return (
        <>
            <BackButton />
            <DisplayInfoLoading />
        </>
        );
    }
}

export default EditProfile;