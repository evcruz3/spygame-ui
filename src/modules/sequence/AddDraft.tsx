import { useAuth } from 'react-oidc-context';
import { APIClient, OpenAPI, ApiError, Body_create_draft_sequences_sequences_drafts__post, DraftSequenceDocument } from '../../client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { unsetIfEmpty } from '../../utils/inputs';
import { DisplayAccessDenied, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, TextInput, Form, FormRow, MultiFileUpload } from '../../components/input';
import { useNavigate, Navigate } from "react-router-dom";
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @returns A form for adding an draft sequence to the database.
 */
function AddDraft() {
    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [draftCreated, setDraftCreated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isValid,
            isDirty
        },
        watch
    } = useForm<Body_create_draft_sequences_sequences_drafts__post>({
        mode: "onBlur"});
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    
    /**
     * Attempts to create the draft sequence record/s at the server.
     * 
     * @prop data Object containing all the fields needed to create draft sequence records.
     */
    const onSubmit = (data: Body_create_draft_sequences_sequences_drafts__post) => {
        setSubmitError(undefined);

        var formData = new FormData();
        for (let i = 0; i < data.fasta_files.length; ++i){
            formData.append("fasta_files", data.fasta_files[i])
        }
        formData.append("metadata", JSON.stringify(data.metadata));

        client.draftSequences.createDraftSequencesSequencesDraftsPost(formData).then(() => {
            // Handle successful draft creation
            console.log(formData)
            setDraftCreated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<Body_create_draft_sequences_sequences_drafts__post> = (errors: FieldErrorsImpl<DeepRequired<Body_create_draft_sequences_sequences_drafts__post>>) => {
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

    if (draftCreated) {
        return <Navigate to="../"/>;
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="addDraft" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;

    return <>
        <Modal 
            header={'New Draft Sequence'} 
            body={<>Would you like to add this sequence to the database of sequences?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <Form title='Add a Draft Sequence'
            id='addDraft'
            method='post'
            onSubmit={handleSubmit(onSubmit, onError)}> 
            <FormRow>
                <MultiFileUpload flex="grow" label="Sequence File/s" {...register("fasta_files", { required: true })} errors={errors} />
            </FormRow>
            <FormRow>
                <TextInput flex='grow' label="Region" {...register("metadata.region", { required: true })} errors={errors} />
                <TextInput flex='grow' label="Collection Date" {...register("metadata.collection_date", { required: true })} errors={errors} />
            </FormRow>
            <FormRow>
                <Button purpose='primary' type="button" disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
            </FormRow>
        </Form>
    </>;
}

export default AddDraft;
