import { useAuth } from 'react-oidc-context';
import { APIClient, OpenAPI, ApiError, Body_create_draft_sequences_sequences_drafts__post, DraftSequenceDocument, Body_update_draft_sequence_sequences_drafts__acc__put } from '../../client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { unsetIfEmpty } from '../../utils/inputs';
import { DisplayAccessDenied, DisplayPVDServerError, DisplayTextInfo, Modal } from '../../components/display';
import { Button, TextInput, Form, FormRow, SingleFileUpload } from '../../components/input';
import { BackButton } from '../../components/input/Button';
import { useParams, useNavigate, Navigate } from "react-router-dom";
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @returns A form for updating a draft sequence in the database.
 */
function EditDraft() {
    const client = new APIClient(OpenAPI);
    const [submitError, setSubmitError] = useState<ApiError>();
    const [draftUpdated, setDraftUpdated] = useState<boolean>();
    const { 
        register, 
        handleSubmit,
        formState: { 
            errors,
            isValid,
            isDirty
        },
        watch
    } = useForm<Body_update_draft_sequence_sequences_drafts__acc__put>({
        mode: "onBlur"});
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const draftAcc = useParams().acc!
    
    /**
     * Attempts to update the draft sequence record at the server.
     * 
     * @prop data Object containing all the fields needed to create a draft sequence record.
     */
    const onSubmit = (data: Body_update_draft_sequence_sequences_drafts__acc__put) => {
        setSubmitError(undefined);

        var formData = new FormData();
        formData.append("fasta_file", data.fasta_file['0']);
        formData.append("metadata", JSON.stringify(data.metadata));

        client.draftSequences.updateDraftSequenceSequencesDraftsAccPut(draftAcc, formData).then(() => {
            // Handle successful draft update
            console.log(formData)
            setDraftUpdated(true);
        }).catch((error: ApiError) => {
            // Handle API Error
            setSubmitError(error);
        }); 
    }

    const onError: SubmitErrorHandler<Body_update_draft_sequence_sequences_drafts__acc__put> = (errors: FieldErrorsImpl<DeepRequired<Body_update_draft_sequence_sequences_drafts__acc__put>>) => {
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

    if (draftUpdated) {
        return <Navigate to="../"/>;
    }

    const buttons = [
        <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
        <Button purpose="danger" type="submit" form="updateDraft" data-bs-dismiss="modal">Confirm</Button>
    ];
    /* The submit button of the form will be disabled if the data has not been edited OR
    *  if the data input is invalid.
    */
    const disableSubmit = !isDirty || !isValid;

    return <>
        <Modal 
            header={'Update Draft Sequence'} 
            body={<>Would you like to update draft sequence <b><u>{draftAcc}</u></b>?</>}
            modalName="submitConfirmation" 
            buttons={buttons}
        />
        <Form title='Update Draft Sequence'
            id='updateDraft'
            method='put'
            onSubmit={handleSubmit(onSubmit, onError)}> 
            <FormRow>
                <SingleFileUpload flex="grow" label="Sequence File" {...register("fasta_file", { required: true })} errors={errors} />
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

export default EditDraft;
