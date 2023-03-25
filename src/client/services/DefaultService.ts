/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameEventDocument } from '../models/GameEventDocument';
import type { JoiningPlayer } from '../models/JoiningPlayer';
import type { PlayerDocument } from '../models/PlayerDocument';
import type { TaskDocument } from '../models/TaskDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

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

    /**
     * Create Event
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public createEventEventsPost(
        requestBody: GameEventDocument,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Join Task
     * @param eventCode
     * @param taskCode
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public joinTaskEventsEventCodeTasksTaskCodePost(
        eventCode: string,
        taskCode: string,
        requestBody: PlayerDocument,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events/{event_code}/tasks/{task_code}',
            path: {
                'event_code': eventCode,
                'task_code': taskCode,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Event Players
     * @param eventCode
     * @returns PlayerDocument Successful Response
     * @throws ApiError
     */
    public getEventPlayersEventsEventCodePlayersGet(
        eventCode: string,
    ): CancelablePromise<Array<PlayerDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/events/{event_code}/players',
            path: {
                'event_code': eventCode,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Join Event
     * @param eventCode
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public joinEventEventsEventCodePlayersPost(
        eventCode: string,
        requestBody: JoiningPlayer,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events/{event_code}/players',
            path: {
                'event_code': eventCode,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Event Player Info
     * @param eventCode
     * @param playerId
     * @returns PlayerDocument Successful Response
     * @throws ApiError
     */
    public getEventPlayerInfoEventsEventCodePlayersPlayerIdGet(
        eventCode: string,
        playerId: string,
    ): CancelablePromise<PlayerDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/events/{event_code}/players/{player_id}',
            path: {
                'event_code': eventCode,
                'player_id': playerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Current Task Of Player
     * @param eventCode
     * @param playerId
     * @returns TaskDocument Successful Response
     * @throws ApiError
     */
    public getCurrentTaskOfPlayerEventsEventCodePlayersPlayerIdCurrentTaskGet(
        eventCode: string,
        playerId: string,
    ): CancelablePromise<TaskDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/events/{event_code}/players/{player_id}/current_task',
            path: {
                'event_code': eventCode,
                'player_id': playerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
