/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 *
 * Inherited from:
 *
 * - Pydantic BaseModel
 * - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)
 */
export type GameEventDocument = {
    /**
     * The code of the current event
     */
    code: string;
    /**
     * The start datetime of the event
     */
    start: string;
    /**
     * The end datetime of the event
     */
    end: string;
    lives: number;
    _id?: string;
};

