/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BioseqDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        seq_ids: {
            type: 'array',
            contains: {
                type: 'SeqId',
            },
            isRequired: true,
        },
        descr: {
            type: 'array',
            contains: {
                type: 'SeqDesc',
            },
        },
        inst: {
            type: 'SeqInst',
            isRequired: true,
        },
        annot: {
            type: 'array',
            contains: {
                type: 'SeqAnnot',
            },
        },
        _id: {
            type: 'string',
        },
        accession_no: {
            type: 'string',
        },
    },
} as const;
