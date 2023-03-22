/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProjectProfileDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        dateDeleted: {
            type: 'string',
            description: `a flag to indicate deletion`,
            format: 'date-time',
        },
        project_title: {
            type: 'string',
            description: `The title of the project`,
            isRequired: true,
        },
        implementing_institution: {
            type: 'string',
            description: `The initiating insitution of the project`,
            isRequired: true,
        },
        funding_institution: {
            type: 'string',
            description: `The funding institution of the project`,
            isRequired: true,
        },
        project_start_date: {
            type: 'string',
            description: `The start date of the project`,
            isRequired: true,
        },
        project_end_date: {
            type: 'string',
            description: `The end date of the project`,
            isRequired: true,
        },
        user_id: {
            type: 'any-of',
            description: `The user_id of the users working under the project`,
            contains: [{
                type: 'array',
                contains: {
                    type: 'UserProfileDocument',
                },
            }, {
                type: 'array',
                contains: {
                    type: 'string',
                },
            }],
            isRequired: true,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
