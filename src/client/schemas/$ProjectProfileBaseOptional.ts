/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProjectProfileBaseOptional = {
    properties: {
        project_title: {
            type: 'string',
        },
        implementing_institution: {
            type: 'string',
        },
        funding_institution: {
            type: 'string',
        },
        project_start_date: {
            type: 'string',
        },
        project_end_date: {
            type: 'string',
        },
        user_id: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'UserProfileDocument',
                },
            }, {
                type: 'array',
                contains: {
                    type: 'string',
                },
            }],
        },
    },
} as const;
