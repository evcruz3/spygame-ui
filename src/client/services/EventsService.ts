/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameEventDocument } from '../models/GameEventDocument';
import type { JoiningPlayer } from '../models/JoiningPlayer';
import type { PlayerDocument } from '../models/PlayerDocument';
import type { TaskDocument } from '../models/TaskDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EventsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

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
     * @returns TaskDocument Successful Response
     * @throws ApiError
     */
    public joinTaskEventsEventCodeTasksTaskCodeJoinPost(
        eventCode: string,
        taskCode: string,
        requestBody: PlayerDocument,
    ): CancelablePromise<TaskDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events/{event_code}/tasks/{task_code}/join',
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
     * Not Join Task
     * @param eventCode
     * @param taskCode
     * @param requestBody
     * @returns TaskDocument Successful Response
     * @throws ApiError
     */
    public notJoinTaskEventsEventCodeTasksTaskCodeNotJoinPost(
        eventCode: string,
        taskCode: string,
        requestBody: PlayerDocument,
    ): CancelablePromise<TaskDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events/{event_code}/tasks/{task_code}/not_join',
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
     * Kill In Task
     * @param eventCode
     * @param taskCode
     * @param playerId
     * @param requestBody
     * @returns TaskDocument Successful Response
     * @throws ApiError
     */
    public killInTaskEventsEventCodeTasksTaskCodeKillPlayerIdPost(
        eventCode: string,
        taskCode: string,
        playerId: string,
        requestBody: PlayerDocument,
    ): CancelablePromise<TaskDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/events/{event_code}/tasks/{task_code}/kill/{player_id}',
            path: {
                'event_code': eventCode,
                'task_code': taskCode,
                'player_id': playerId,
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
