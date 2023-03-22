/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SubmittedSequencesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get All Submitted Sequences
     * Route for displaying all submitted sequences.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getAllSubmittedSequencesSequencesSubmittedGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/submitted',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Get One Submitted Sequence
     * Route for displaying one submitted sequence, identified by accession no.
     * @param acc
     * @returns any Successful Response
     * @throws ApiError
     */
    public getOneSubmittedSequenceSequencesSubmittedAccGet(
        acc: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/submitted/{acc}',
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
     * Approve Draft Sequence
     * Approves a draft and moves it to the approved database.
     * @param acc
     * @returns any Successful Response
     * @throws ApiError
     */
    public approveDraftSequenceSequencesSubmittedAccPost(
        acc: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sequences/submitted/{acc}',
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
     * Return Draft For Revision
     * Route for marking a submitted draft as `for_revision`.
     * @param acc
     * @returns any Successful Response
     * @throws ApiError
     */
    public returnDraftForRevisionSequencesSubmittedAccReturnPost(
        acc: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sequences/submitted/{acc}/return',
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
