/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PubStatusHist = {
    properties: {
        status: {
            type: 'SeqDescPubStatusEnum',
            isRequired: true,
        },
        date: {
            type: 'DateStr',
            isRequired: true,
        },
    },
} as const;
