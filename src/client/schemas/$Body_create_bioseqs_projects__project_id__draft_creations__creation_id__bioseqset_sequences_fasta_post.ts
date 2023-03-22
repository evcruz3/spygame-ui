/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post = {
    properties: {
        fasta_files: {
            type: 'array',
            contains: {
                type: 'binary',
                format: 'binary',
            },
            isRequired: true,
        },
    },
} as const;
