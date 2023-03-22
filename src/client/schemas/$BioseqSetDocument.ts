/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BioseqSetDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        level: {
            type: 'number',
        },
        set_class: {
            type: 'BioseqSetClassEnum',
            isRequired: true,
        },
        release: {
            type: 'string',
        },
        created_date: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        descr: {
            type: 'array',
            contains: {
                type: 'SeqDesc',
            },
        },
        seq_set: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'string',
                },
            }, {
                type: 'array',
                contains: {
                    type: 'Bioseq',
                },
            }],
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
    },
} as const;
