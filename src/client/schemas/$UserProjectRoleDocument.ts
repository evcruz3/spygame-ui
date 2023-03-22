/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserProjectRoleDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        project_id: {
            type: 'any-of',
            description: `The user's project ID`,
            contains: [{
                type: 'ProjectProfileDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
        user_id: {
            type: 'any-of',
            description: `The user's ID`,
            contains: [{
                type: 'UserProfileDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
        position: {
            type: 'all-of',
            description: `The user's position/role in the project`,
            contains: [{
                type: 'ProjectPosition',
            }],
            isRequired: true,
        },
        role: {
            type: 'array',
            contains: {
                type: 'ProjectRole',
            },
        },
        startDate: {
            type: 'string',
            description: `The user's start date of the project`,
            isRequired: true,
        },
        endDate: {
            type: 'string',
            description: `The user's end date of the project`,
            isRequired: true,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
