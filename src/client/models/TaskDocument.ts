/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Participant } from './Participant';
import type { TaskStatusEnum } from './TaskStatusEnum';
import type { TaskTypeEnum } from './TaskTypeEnum';
import type { Vote } from './Vote';

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
export type TaskDocument = {
    /**
     * The event code the user is part of
     */
    event_code: string;
    /**
     * The name of the the task
     */
    name: string;
    /**
     * The type of the task
     */
    type: TaskTypeEnum;
    participants: Array<Participant>;
    /**
     * The datetime the task shall commence
     */
    start_time: string;
    /**
     * The datetime the task shall end
     */
    end_time: string;
    /**
     * The task code
     */
    task_code: string;
    /**
     * The datetime the participants must join the task
     */
    join_until: string;
    /**
     * The current state of the task
     */
    status: TaskStatusEnum;
    /**
     * Allow kill, field used by diamond task, default to True
     */
    allow_action: boolean;
    /**
     * The votes of the players in the task
     */
    votes: Array<Vote>;
    _id?: string;
};

