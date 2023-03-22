/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InstitutionProfileDocument } from '../models/InstitutionProfileDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InstitutionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * View Institution
     * @param institutionId
     * @returns InstitutionProfileDocument Successful Response
     * @throws ApiError
     */
    public viewInstitutionInstitutionsInstitutionIdGet(
        institutionId: string,
    ): CancelablePromise<InstitutionProfileDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/institutions/{institution_id}',
            path: {
                'institution_id': institutionId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Institution
     * @param institutionId
     * @returns void
     * @throws ApiError
     */
    public deleteInstitutionInstitutionsInstitutionIdDelete(
        institutionId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/institutions/{institution_id}',
            path: {
                'institution_id': institutionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Institution
     * @param institutionId
     * @param requestBody
     * @returns InstitutionProfileDocument Successful Response
     * @throws ApiError
     */
    public updateInstitutionInstitutionsInstitutionIdPatch(
        institutionId: string,
        requestBody: any,
    ): CancelablePromise<InstitutionProfileDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/institutions/{institution_id}',
            path: {
                'institution_id': institutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View All Institutions
     * @returns InstitutionProfileDocument Successful Response
     * @throws ApiError
     */
    public viewAllInstitutionsInstitutionsGet(): CancelablePromise<Array<InstitutionProfileDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/institutions',
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Create Institution
     * @param requestBody
     * @returns InstitutionProfileDocument Successful Response
     * @throws ApiError
     */
    public createInstitutionInstitutionsPost(
        requestBody: InstitutionProfileDocument,
    ): CancelablePromise<InstitutionProfileDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/institutions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
