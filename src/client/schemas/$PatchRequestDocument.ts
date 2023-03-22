/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchRequestDocument = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        _id: {
            type: 'string',
        },
        status: {
            type: 'all-of',
            description: `The status of the role request`,
            contains: [{
                type: 'RequestState',
            }],
        },
    },
} as const;
