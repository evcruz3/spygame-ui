/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ParticipantStatusEnum } from './ParticipantStatusEnum';
import type { PlayerDocument } from './PlayerDocument';

export type Participant = {
    /**
     * The player's id/profile
     */
    player: (PlayerDocument | string);
    /**
     * the state of the player with respect to the task
     */
    status: ParticipantStatusEnum;
};

