/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { APIClient } from './APIClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { GameEventDocument } from './models/GameEventDocument';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { JoiningPlayer } from './models/JoiningPlayer';
export type { PlayerDocument } from './models/PlayerDocument';
export { PlayerRoleEnum } from './models/PlayerRoleEnum';
export type { ValidationError } from './models/ValidationError';

export { $GameEventDocument } from './schemas/$GameEventDocument';
export { $HTTPValidationError } from './schemas/$HTTPValidationError';
export { $JoiningPlayer } from './schemas/$JoiningPlayer';
export { $PlayerDocument } from './schemas/$PlayerDocument';
export { $PlayerRoleEnum } from './schemas/$PlayerRoleEnum';
export { $ValidationError } from './schemas/$ValidationError';

export { DefaultService } from './services/DefaultService';
