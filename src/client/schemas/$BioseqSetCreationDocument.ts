/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BioseqSetCreationDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        creation_name: {
            type: 'string',
        },
        created_by: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'UserProfileDocument',
            }],
            isRequired: true,
        },
        create_date: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        edited_date: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        edited_by: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'UserProfileDocument',
            }],
            isRequired: true,
        },
        bioseqset: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'BioseqSetDocument',
            }],
        },
        project: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'ProjectProfileDocument',
            }],
            isRequired: true,
        },
        status: {
            type: 'BioseqSetCreationStatusEnum',
            isRequired: true,
        },
        submissions: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'string',
                },
            }, {
                type: 'array',
                contains: {
                    type: 'SequenceSubmissionDocument',
                },
            }],
        },
        _id: {
            type: 'string',
        },
    },
} as const;
