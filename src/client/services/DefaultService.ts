/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Trigger Create Task
     * @returns any Successful Response
     * @throws ApiError
     */
    public triggerCreateTaskTriggerCreateTaskGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/trigger_create_task',
        });
    }

    /**
     * Trigger Start Task
     * @returns any Successful Response
     * @throws ApiError
     */
    public triggerStartTaskTriggerStartTaskGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/trigger_start_task',
        });
    }

    /**
     * Trigger End Task
     * @returns any Successful Response
     * @throws ApiError
     */
    public triggerEndTaskTriggerEndTaskGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/trigger_end_task',
        });
    }

    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public rootGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }

}
