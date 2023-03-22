/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedSequenceDocument } from '../models/ApprovedSequenceDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ApprovedSequencesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get All Approved Sequences
     * Route for displaying all approved sequences.
     * @returns ApprovedSequenceDocument Successful Response
     * @throws ApiError
     */
    public getAllApprovedSequencesSequencesApprovedGet(): CancelablePromise<Array<ApprovedSequenceDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/approved',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Get One Approved Sequence
     * Route for displaying one approved sequence, identified by acc. no.
     * @param acc
     * @returns ApprovedSequenceDocument Successful Response
     * @throws ApiError
     */
    public getOneApprovedSequenceSequencesApprovedAccGet(
        acc: string,
    ): CancelablePromise<ApprovedSequenceDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequences/approved/{acc}',
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
