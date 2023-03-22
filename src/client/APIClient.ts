/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ApprovedSequencesService } from './services/ApprovedSequencesService';
import { DefaultService } from './services/DefaultService';
import { DraftSequencesService } from './services/DraftSequencesService';
import { InstitutionsService } from './services/InstitutionsService';
import { ProjectsService } from './services/ProjectsService';
import { SequenceSubmissionsService } from './services/SequenceSubmissionsService';
import { SubmittedSequencesService } from './services/SubmittedSequencesService';
import { UsersService } from './services/UsersService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class APIClient {

    public readonly approvedSequences: ApprovedSequencesService;
    public readonly default: DefaultService;
    public readonly draftSequences: DraftSequencesService;
    public readonly institutions: InstitutionsService;
    public readonly projects: ProjectsService;
    public readonly sequenceSubmissions: SequenceSubmissionsService;
    public readonly submittedSequences: SubmittedSequencesService;
    public readonly users: UsersService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.approvedSequences = new ApprovedSequencesService(this.request);
        this.default = new DefaultService(this.request);
        this.draftSequences = new DraftSequencesService(this.request);
        this.institutions = new InstitutionsService(this.request);
        this.projects = new ProjectsService(this.request);
        this.sequenceSubmissions = new SequenceSubmissionsService(this.request);
        this.submittedSequences = new SubmittedSequencesService(this.request);
        this.users = new UsersService(this.request);
    }
}

