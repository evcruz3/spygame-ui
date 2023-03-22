/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SequenceSubmissionDocument } from '../models/SequenceSubmissionDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SequenceSubmissionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * View Submissions
     * @returns SequenceSubmissionDocument Successful Response
     * @throws ApiError
     */
    public viewSubmissionsSequenceSubmissionsPendingGet(): CancelablePromise<Array<SequenceSubmissionDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequence_submissions/pending',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * View Submissions
     * @param submissionId
     * @returns SequenceSubmissionDocument Successful Response
     * @throws ApiError
     */
    public viewSubmissionsSequenceSubmissionsPendingSubmissionIdGet(
        submissionId: string,
    ): CancelablePromise<SequenceSubmissionDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sequence_submissions/pending/{submission_id}',
            path: {
                'submission_id': submissionId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}
