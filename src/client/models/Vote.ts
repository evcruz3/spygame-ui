/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerDocument } from './PlayerDocument';

export type Vote = {
    /**
     * The player who voted
     */
    player: (PlayerDocument | string);
    /**
     * The player being voted out
     */
    vote: (PlayerDocument | string);
};

