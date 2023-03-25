/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameEventDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        code: {
            type: 'string',
            description: `The code of the current event`,
            isRequired: true,
        },
        start: {
            type: 'string',
            description: `The start datetime of the event`,
            isRequired: true,
            format: 'date-time',
        },
        end: {
            type: 'string',
            description: `The end datetime of the event`,
            isRequired: true,
            format: 'date-time',
        },
        lives: {
            type: 'number',
            isRequired: true,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
