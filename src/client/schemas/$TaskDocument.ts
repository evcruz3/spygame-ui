/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TaskDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        event_code: {
            type: 'string',
            description: `The event code the user is part of`,
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `The name of the the task`,
            isRequired: true,
        },
        type: {
            type: 'all-of',
            description: `The type of the task`,
            contains: [{
                type: 'TaskTypeEnum',
            }],
            isRequired: true,
        },
        participants: {
            type: 'array',
            contains: {
                type: 'Participant',
            },
            isRequired: true,
        },
        start_time: {
            type: 'string',
            description: `The datetime the task shall commence`,
            isRequired: true,
            format: 'date-time',
        },
        end_time: {
            type: 'string',
            description: `The datetime the task shall end`,
            isRequired: true,
            format: 'date-time',
        },
        task_code: {
            type: 'string',
            description: `The task code`,
            isRequired: true,
        },
        join_until: {
            type: 'string',
            description: `The datetime the participants must join the task`,
            isRequired: true,
            format: 'date-time',
        },
        status: {
            type: 'all-of',
            description: `The current state of the task`,
            contains: [{
                type: 'TaskStatusEnum',
            }],
            isRequired: true,
        },
        allow_kill: {
            type: 'boolean',
            description: `Allow kill, field used by diamond task, default to True`,
            isRequired: true,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
