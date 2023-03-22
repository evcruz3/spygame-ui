/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_create_draft_sequences_sequences_drafts_post = {
    properties: {
        fasta_files: {
            type: 'array',
            contains: {
                type: 'binary',
                format: 'binary',
            },
            isRequired: true,
        },
        metadata: {
            type: 'SequenceMetadata',
            isRequired: true,
        },
    },
} as const;
