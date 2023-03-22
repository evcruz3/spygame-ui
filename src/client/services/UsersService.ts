/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchRequestDocument } from '../models/PatchRequestDocument';
import type { ProjectProfileDocument } from '../models/ProjectProfileDocument';
import type { UserProfileDocument } from '../models/UserProfileDocument';
import type { UserProfileUpdateRequest } from '../models/UserProfileUpdateRequest';
import type { UserRoleRequest } from '../models/UserRoleRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get User Role Request
     * @param requestId
     * @returns any Successful Response
     * @throws ApiError
     */
    public getUserRoleRequestUsersRoleRequestsRequestIdGet(
        requestId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/role_requests/{request_id}',
            path: {
                'request_id': requestId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User Role Request
     * @param requestId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateUserRoleRequestUsersRoleRequestsRequestIdPatch(
        requestId: string,
        requestBody: PatchRequestDocument,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/role_requests/{request_id}',
            path: {
                'request_id': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View All User Role Requests
     * @param status
     * @param role
     * @returns UserRoleRequest Successful Response
     * @throws ApiError
     */
    public viewAllUserRoleRequestsUsersRoleRequestsGet(
        status: string = 'pending',
        role: string = 'pvd-validator,pvd-site-admin',
    ): CancelablePromise<Array<UserRoleRequest>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/role_requests',
            query: {
                'status': status,
                'role': role,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Insert Role Request
     * @param requestBody
     * @returns UserRoleRequest Successful Response
     * @throws ApiError
     */
    public insertRoleRequestUsersRoleRequestsPost(
        requestBody: UserRoleRequest,
    ): CancelablePromise<UserRoleRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/role_requests',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View User Update Request
     * @param requestId
     * @returns UserProfileUpdateRequest Successful Response
     * @throws ApiError
     */
    public viewUserUpdateRequestUsersUpdateRequestsRequestIdGet(
        requestId: string,
    ): CancelablePromise<UserProfileUpdateRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/update_requests/{request_id}',
            path: {
                'request_id': requestId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User Profile Update Request
     * @param requestId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateUserProfileUpdateRequestUsersUpdateRequestsRequestIdPatch(
        requestId: string,
        requestBody: PatchRequestDocument,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/update_requests/{request_id}',
            path: {
                'request_id': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View All User Profile Update Requests
     * @param status
     * @returns UserProfileUpdateRequest Successful Response
     * @throws ApiError
     */
    public viewAllUserProfileUpdateRequestsUsersUpdateRequestsGet(
        status: string = 'pending',
    ): CancelablePromise<Array<UserProfileUpdateRequest>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/update_requests',
            query: {
                'status': status,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User Profile
     * @param requestBody
     * @returns UserProfileUpdateRequest Successful Response
     * @throws ApiError
     */
    public updateUserProfileUsersUpdateRequestsPost(
        requestBody: UserProfileUpdateRequest,
    ): CancelablePromise<UserProfileUpdateRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/update_requests',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View User Projects
     * @param userId
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public viewUserProjectsUsersUserIdProjectsGet(
        userId: string,
    ): CancelablePromise<Array<ProjectProfileDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}/projects',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * View User Profile
     * @param userId
     * @returns UserProfileDocument Successful Response
     * @throws ApiError
     */
    public viewUserProfileUsersUserIdGet(
        userId: string,
    ): CancelablePromise<UserProfileDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
