/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserProfileDocument = {
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
        oidc_user_id: {
            type: 'string',
            description: `The OIDC User ID of the user`,
            isRequired: true,
        },
        first_name: {
            type: 'string',
            description: `The first name of the user.`,
            isRequired: true,
        },
        middle_name: {
            type: 'string',
            description: `The middle name of the user.`,
        },
        last_name: {
            type: 'string',
            description: `The last name of the user.`,
            isRequired: true,
        },
        suffix: {
            type: 'string',
            description: `The suffix of the user (e.g., Jr., Sr.)`,
        },
        organization: {
            type: 'string',
            description: `The organization of the user.`,
        },
        department: {
            type: 'string',
            description: `The department of the user.`,
        },
        region: {
            type: 'string',
            description: `The region of the user.`,
        },
        province: {
            type: 'string',
            description: `The province of the user.`,
        },
        city_municipality: {
            type: 'string',
            description: `The province of the user.`,
        },
        street_address: {
            type: 'string',
            description: `The street address of the user.`,
        },
        contact_number: {
            type: 'string',
            description: `The contact number of the user.`,
            isRequired: true,
        },
        office_number: {
            type: 'string',
            description: `The office number of the user.`,
        },
        email_address: {
            type: 'string',
            description: `The email address of the user.`,
            isRequired: true,
            format: 'email',
        },
        alt_email_address: {
            type: 'string',
            description: `The alternate email address of the user.`,
            format: 'email',
        },
        affiliation: {
            type: 'any-of',
            description: `The affiliated institution of the user.`,
            contains: [{
                type: 'InstitutionProfileDocument',
            }, {
                type: 'string',
            }],
        },
        roles: {
            type: 'array',
            contains: {
                type: 'UserRole',
            },
        },
        _id: {
            type: 'string',
        },
    },
} as const;
