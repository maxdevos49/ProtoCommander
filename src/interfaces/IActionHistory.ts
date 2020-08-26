import { IUndoable } from "./IUndoable.js";

/**
 * This may be wrong
 */
export interface IActionHistory<T extends IUndoable<D>, D> {
    name: string;

    data: Array<{ instance: T; state: D; }>;
}