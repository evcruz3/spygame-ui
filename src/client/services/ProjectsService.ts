/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bioseq } from '../models/Bioseq';
import type { BioseqDocument } from '../models/BioseqDocument';
import type { BioseqSetCreationDocument } from '../models/BioseqSetCreationDocument';
import type { BioseqSetCreationRequest } from '../models/BioseqSetCreationRequest';
import type { BioseqSetDocument } from '../models/BioseqSetDocument';
import type { Body_create_bioseq_source_modifiers_projects__project_id__draft_creations__creation_id__bioseqset_sequences_source_modifiers_post } from '../models/Body_create_bioseq_source_modifiers_projects__project_id__draft_creations__creation_id__bioseqset_sequences_source_modifiers_post';
import type { Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post } from '../models/Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post';
import type { ProjectProfileBaseOptional } from '../models/ProjectProfileBaseOptional';
import type { ProjectProfileDocument } from '../models/ProjectProfileDocument';
import type { SequenceSubmissionDocument } from '../models/SequenceSubmissionDocument';
import type { UserProjectRoleDocument } from '../models/UserProjectRoleDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProjectsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * View Project
     * @param projectId
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public viewProjectProjectsProjectIdGet(
        projectId: string,
    ): CancelablePromise<ProjectProfileDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Project
     * @param projectId
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public deleteProjectProjectsProjectIdDelete(
        projectId: string,
    ): CancelablePromise<ProjectProfileDocument> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Project
     * @param projectId
     * @param requestBody
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public updateProjectProjectsProjectIdPatch(
        projectId: string,
        requestBody: ProjectProfileBaseOptional,
    ): CancelablePromise<ProjectProfileDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View All Projects
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public viewAllProjectsProjectsGet(): CancelablePromise<Array<ProjectProfileDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects',
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Create Project
     * @param requestBody
     * @returns ProjectProfileDocument Successful Response
     * @throws ApiError
     */
    public createProjectProjectsPost(
        requestBody: ProjectProfileDocument,
    ): CancelablePromise<ProjectProfileDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Single Project Member
     * @param projectId
     * @param userId
     * @returns UserProjectRoleDocument Successful Response
     * @throws ApiError
     */
    public getSingleProjectMemberProjectsProjectIdMembersUserIdGet(
        projectId: string,
        userId: string,
    ): CancelablePromise<UserProjectRoleDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/members/{user_id}',
            path: {
                'project_id': projectId,
                'user_id': userId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Put Project Member
     * @param projectId
     * @param userId
     * @param requestBody
     * @returns UserProjectRoleDocument Successful Response
     * @throws ApiError
     */
    public putProjectMemberProjectsProjectIdMembersUserIdPut(
        projectId: string,
        userId: string,
        requestBody: UserProjectRoleDocument,
    ): CancelablePromise<UserProjectRoleDocument> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/projects/{project_id}/members/{user_id}',
            path: {
                'project_id': projectId,
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Project Member
     * @param projectId
     * @param userId
     * @returns UserProjectRoleDocument Successful Response
     * @throws ApiError
     */
    public deleteProjectMemberProjectsProjectIdMembersUserIdDelete(
        projectId: string,
        userId: string,
    ): CancelablePromise<UserProjectRoleDocument> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/projects/{project_id}/members/{user_id}',
            path: {
                'project_id': projectId,
                'user_id': userId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Put Project Members
     * @param projectId
     * @param requestBody
     * @returns UserProjectRoleDocument Successful Response
     * @throws ApiError
     */
    public putProjectMembersProjectsProjectIdMembersPut(
        projectId: string,
        requestBody: Array<UserProjectRoleDocument>,
    ): CancelablePromise<Array<UserProjectRoleDocument>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/projects/{project_id}/members/',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Project Members
     * @param projectId
     * @param limit
     * @returns UserProjectRoleDocument Successful Response
     * @throws ApiError
     */
    public getAllProjectMembersProjectsProjectIdMembersGet(
        projectId: string,
        limit: number = 10,
    ): CancelablePromise<Array<UserProjectRoleDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/members',
            path: {
                'project_id': projectId,
            },
            query: {
                'limit': limit,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Approved Sequence Creations
     * @param projectId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectApprovedSequenceCreationsProjectsProjectIdApprovedCreationsGet(
        projectId: string,
    ): CancelablePromise<Array<BioseqSetCreationDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/approved_creations',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Submitted Sequence Creations
     * @param projectId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectSubmittedSequenceCreationsProjectsProjectIdSubmittedCreationsGet(
        projectId: string,
    ): CancelablePromise<Array<BioseqSetCreationDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/submitted_creations',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Draft Sequence Creations
     * @param projectId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsGet(
        projectId: string,
    ): CancelablePromise<Array<BioseqSetCreationDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/draft_creations',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Draft Sequence Creation
     * @param projectId
     * @param requestBody
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public createDraftSequenceCreationProjectsProjectIdDraftCreationsPost(
        projectId: string,
        requestBody: BioseqSetCreationRequest,
    ): CancelablePromise<BioseqSetCreationDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/draft_creations',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Approved Sequence Creations
     * @param projectId
     * @param creationId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectApprovedSequenceCreationsProjectsProjectIdApprovedCreationsCreationIdGet(
        projectId: string,
        creationId: string,
    ): CancelablePromise<BioseqSetCreationDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/approved_creations/{creation_id}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Submitted Sequence Creations
     * @param projectId
     * @param creationId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectSubmittedSequenceCreationsProjectsProjectIdSubmittedCreationsCreationIdGet(
        projectId: string,
        creationId: string,
    ): CancelablePromise<BioseqSetCreationDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/submitted_creations/{creation_id}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * View Project Draft Sequence Creations
     * @param projectId
     * @param creationId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsCreationIdGet(
        projectId: string,
        creationId: string,
    ): CancelablePromise<BioseqSetCreationDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/draft_creations/{creation_id}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Project Draft Sequence Creation
     * @param projectId
     * @param creationId
     * @returns BioseqSetCreationDocument Successful Response
     * @throws ApiError
     */
    public deleteProjectDraftSequenceCreationProjectsProjectIdDraftCreationsCreationIdDelete(
        projectId: string,
        creationId: string,
    ): CancelablePromise<BioseqSetCreationDocument> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/projects/{project_id}/draft_creations/{creation_id}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Submit Draft Sequence Creation
     * @param projectId
     * @param creationId
     * @returns SequenceSubmissionDocument Successful Response
     * @throws ApiError
     */
    public submitDraftSequenceCreationProjectsProjectIdDraftCreationsCreationIdPatch(
        projectId: string,
        creationId: string,
    ): CancelablePromise<SequenceSubmissionDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}/draft_creations/{creation_id}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Draft Sequence Creation Bioseqset
     * @param projectId
     * @param creationId
     * @param requestBody
     * @returns BioseqSetDocument Successful Response
     * @throws ApiError
     */
    public updateDraftSequenceCreationBioseqsetProjectsProjectIdDraftCreationsCreationIdBioseqsetPatch(
        projectId: string,
        creationId: string,
        requestBody: any,
    ): CancelablePromise<BioseqSetDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseqs
     * @param projectId
     * @param creationId
     * @returns BioseqDocument Successful Response
     * @throws ApiError
     */
    public createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesGet(
        projectId: string,
        creationId: string,
    ): CancelablePromise<Array<BioseqDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseqs
     * @param projectId
     * @param creationId
     * @param requestBody
     * @returns BioseqDocument Successful Response
     * @throws ApiError
     */
    public createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesPost(
        projectId: string,
        creationId: string,
        requestBody: Array<Bioseq>,
    ): CancelablePromise<Array<BioseqDocument>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseqs
     * @param projectId
     * @param creationId
     * @param formData
     * @returns BioseqDocument Successful Response
     * @throws ApiError
     */
    public createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesFastaPost(
        projectId: string,
        creationId: string,
        formData: Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post,
    ): CancelablePromise<Array<BioseqDocument>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences/fasta',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseq Source Modifiers
     * @param projectId
     * @param creationId
     * @param formData
     * @returns BioseqDocument Successful Response
     * @throws ApiError
     */
    public createBioseqSourceModifiersProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesSourceModifiersPost(
        projectId: string,
        creationId: string,
        formData: Body_create_bioseq_source_modifiers_projects__project_id__draft_creations__creation_id__bioseqset_sequences_source_modifiers_post,
    ): CancelablePromise<Array<BioseqDocument>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences/source_modifiers',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseqs
     * @param projectId
     * @param creationId
     * @param accessionNo
     * @returns void
     * @throws ApiError
     */
    public createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesAccessionNoDelete(
        projectId: string,
        creationId: string,
        accessionNo: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences/{accession_no}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
                'accession_no': accessionNo,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bioseqs
     * @param projectId
     * @param creationId
     * @param accessionNo
     * @param requestBody
     * @returns BioseqDocument Successful Response
     * @throws ApiError
     */
    public createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesAccessionNoPatch(
        projectId: string,
        creationId: string,
        accessionNo: string,
        requestBody: any,
    ): CancelablePromise<BioseqDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}/draft_creations/{creation_id}/bioseqset/sequences/{accession_no}',
            path: {
                'project_id': projectId,
                'creation_id': creationId,
                'accession_no': accessionNo,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}
