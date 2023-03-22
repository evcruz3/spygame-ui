/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SequenceSubmissionDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        submitted_by: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'UserProfileDocument',
            }],
            isRequired: true,
        },
        submission_date: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        bioseq_set: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'BioseqSet',
            }],
            isRequired: true,
        },
        submission_number: {
            type: 'number',
            isRequired: true,
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
        review: {
            type: 'SubmissionReview',
        },
        _id: {
            type: 'string',
        },
    },
} as const;
