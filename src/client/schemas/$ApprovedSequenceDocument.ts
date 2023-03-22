/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApprovedSequenceDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        accession_no: {
            type: 'string',
            description: `PVD accession number`,
        },
        title: {
            type: 'string',
            description: `The title of the sequence.`,
            isRequired: true,
        },
        sequence: {
            type: 'string',
            description: `The sequence.`,
            isRequired: true,
        },
        metadata: {
            type: 'all-of',
            description: `Sequence metadata`,
            contains: [{
                type: 'SequenceMetadata',
            }],
            isRequired: true,
        },
        time_created: {
            type: 'string',
            description: `Time of creation`,
            format: 'date-time',
        },
        time_last_updated: {
            type: 'string',
            description: `Time of latest update`,
            format: 'date-time',
        },
        _id: {
            type: 'string',
        },
        time_approved: {
            type: 'string',
            description: `Time of approval`,
            format: 'date-time',
        },
    },
} as const;
