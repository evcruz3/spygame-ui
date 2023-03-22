/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CdRegion = {
    properties: {
        orf: {
            type: 'boolean',
        },
        frame: {
            type: 'all-of',
            contains: [{
                type: 'FrameEnum',
            }],
        },
        conflict: {
            type: 'boolean',
        },
        gaps: {
            type: 'number',
        },
        mismatch: {
            type: 'number',
        },
        code: {
            type: 'string',
        },
        code_break: {
            type: 'array',
            contains: {
                type: 'CodeBreak',
            },
        },
        stop: {
            type: 'number',
        },
    },
} as const;
