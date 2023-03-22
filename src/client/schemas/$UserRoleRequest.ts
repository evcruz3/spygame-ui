/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserRoleRequest = {
    description: `Document Mapping class.

    Fields:

    - \`id\` - MongoDB document ObjectID "_id" field.
    Mapped to the PydanticObjectId class

    Inherited from:

    - Pydantic BaseModel
    - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)`,
    properties: {
        oidc_user_id: {
            type: 'any-of',
            description: `The OIDC User ID of the user`,
            contains: [{
                type: 'UserProfileDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
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
        role: {
            type: 'all-of',
            description: `The role user is requesting for`,
            contains: [{
                type: 'RequestableUserRole',
            }],
            isRequired: true,
        },
    },
} as const;
