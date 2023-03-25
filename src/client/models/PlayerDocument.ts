/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerRoleEnum } from './PlayerRoleEnum';

/**
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 *
 * Inherited from:
 *
 * - Pydantic BaseModel
 * - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)
 */
export type PlayerDocument = {
    /**
     * The event code the user is part of
     */
    event_code: string;
    /**
     * The name of the the player
     */
    name: string;
    /**
     * Remaining number of lives left
     */
    lives_left: number;
    /**
     * State of the player
     */
    state: string;
    /**
     * The role of the player in the event
     */
    role: PlayerRoleEnum;
    _id?: string;
};

