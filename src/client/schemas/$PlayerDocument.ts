/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayerDocument = {
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
            description: `The name of the the player`,
            isRequired: true,
        },
        lives_left: {
            type: 'number',
            description: `Remaining number of lives left`,
            isRequired: true,
        },
        state: {
            type: 'string',
            description: `State of the player`,
            isRequired: true,
        },
        role: {
            type: 'all-of',
            description: `The role of the player in the event`,
            contains: [{
                type: 'PlayerRoleEnum',
            }],
            isRequired: true,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
