/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InstitutionProfileDocument = {
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
        institution_name: {
            type: 'string',
            description: `The name of the institution`,
            isRequired: true,
        },
        institution_address: {
            type: 'string',
            description: `The address of the institution`,
            isRequired: true,
        },
        email: {
            type: 'string',
            description: `The E-mail Address of the institution`,
            isRequired: true,
            format: 'email',
        },
        phone: {
            type: 'number',
            description: `The telephone number of the institution`,
            isRequired: true,
        },
        parent_institution: {
            type: 'string',
            description: `The parent institution of the institution`,
        },
        _id: {
            type: 'string',
        },
    },
} as const;
