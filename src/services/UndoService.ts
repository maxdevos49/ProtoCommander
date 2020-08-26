import { service } from "../decorators/service.js";
import { IUndoable } from "../interfaces/IUndoable.js";

@service()
export class UndoService {

    constructor() {

    }

    public addGroup(actionName: string, actions: () => void): void {
        throw new Error("Method not implemented.");
    }

    public add<T extends IUndoable<D>, D>(actionName: string, target: T, data: D): void {
        throw new Error("Method not implemented.");
    }

    public undo(times: number = 1): void {
        throw new Error("Method not implemented.");
    }

    public redo(times: number = 1): void {
        throw new Error("Method not implemented.");
    }


}