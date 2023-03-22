/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubmissionResultEnum } from './SubmissionResultEnum';
import type { UserProfileDocument } from './UserProfileDocument';

export type SubmissionReview = {
    validator: (string | UserProfileDocument);
    review_date: string;
    result: SubmissionResultEnum;
    comments?: string;
};

