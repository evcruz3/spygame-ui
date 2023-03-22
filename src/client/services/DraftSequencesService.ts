/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_draft_sequences_sequences_drafts_post } from '../models/Body_create_draft_sequences_sequences_drafts_post';
import type { Body_update_draft_sequence_sequences_drafts__acc__patch } from '../models/Body_update_draft_sequence_sequences_drafts__acc__patch';
import type { DraftSequenceDocument } from '../models/DraftSequenceDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DraftSequencesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get All Draft Sequences
     * Route for displaying all draft sequences.
     * @returns DraftSequenceDocument Successful Response
     * @throws ApiError
     */
    public getAllDraftSequencesSequencesDraftsGet(): CancelablePromise<Array<DraftSequenceDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/drafts',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create Draft Sequences
     * Route for uploading sequences as a draft.
     * @param formData
     * @returns DraftSequenceDocument Successful Response
     * @throws ApiError
     */
    public createDraftSequencesSequencesDraftsPost(
        formData: Body_create_draft_sequences_sequences_drafts_post,
    ): CancelablePromise<Array<DraftSequenceDocument>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sequences/drafts',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Draft Sequence
     * Route for displaying one draft sequence, identified by accession no.
     * @param acc
     * @returns DraftSequenceDocument Successful Response
     * @throws ApiError
     */
    public getDraftSequenceSequencesDraftsAccGet(
        acc: string,
    ): CancelablePromise<DraftSequenceDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/drafts/{acc}',
            path: {
                'acc': acc,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Draft Sequence
     * Route for deleting a particular sequence.
     * @param acc
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteDraftSequenceSequencesDraftsAccDelete(
        acc: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/sequences/drafts/{acc}',
            path: {
                'acc': acc,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Draft Sequence
     * Route for updating one particular sequence.
     * @param acc
     * @param formData
     * @returns DraftSequenceDocument Successful Response
     * @throws ApiError
     */
    public updateDraftSequenceSequencesDraftsAccPatch(
        acc: string,
        formData: Body_update_draft_sequence_sequences_drafts__acc__patch,
    ): CancelablePromise<DraftSequenceDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/sequences/drafts/{acc}',
            path: {
                'acc': acc,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Submit Draft Sequence
     * Route for submitting a draft for review.
     * @param acc
     * @returns DraftSequenceDocument Successful Response
     * @throws ApiError
     */
    public submitDraftSequenceSequencesDraftsAccSubmitPost(
        acc: string,
    ): CancelablePromise<DraftSequenceDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sequences/drafts/{acc}/submit',
            path: {
                'acc': acc,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}
