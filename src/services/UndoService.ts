import { service } from "../decorators/service.js";
import { IUndoable } from "../interfaces/IUndoable.js";

interface IUndoHistory<T extends IUndoable<D>, D> {
    name: string;

    data: Array<{ target: T; state: D; }>;
}

@service()
export class UndoService {

    private _groupMode: boolean;
    private readonly _undo: Array<IUndoHistory<any, any>>;
    private readonly _redo: Array<IUndoHistory<any, any>>;

    constructor() {
        this._groupMode = false;
        this._undo = new Array();
        this._redo = new Array();
    }

    public addGroup(historyName: string, actions: () => void): void {

        if (typeof historyName !== "string" || historyName.length === 0)
            throw new TypeError("History name must be a valid string at least 1 character long");

        if (typeof actions !== "function")
            throw new TypeError("The actions callback is not valid");

        let newUndoHistory: IUndoHistory<any, any> = {
            name: historyName,
            data: []
        };

        this._undo.push(newUndoHistory);

        this._groupMode = true;

        actions();

        this._groupMode = false;
    }

    public add<T extends IUndoable<D>, D>(historyName: string, target: T, data: D): void {

        if (typeof historyName !== "string" || historyName.length === 0)
            throw new TypeError("History name must be a valid string at least 1 character long");

        if (typeof target !== "object")
            throw new TypeError("The undoable target is not valid.");

        if (data === null || data === undefined)
            throw new TypeError("Data must not be null or undefined.");


        if (this._groupMode) {

            //Add target and state to newest undoHistory to group the changes together
            this._undo[this._undo.length - 1].data.push({
                target: target,
                state: data
            });

        } else {
            
            let newUndoHistory: IUndoHistory<T, D> = {
                name: historyName,
                data: [{
                    target: target,
                    state: data
                }]
            };

            this._undo.push(newUndoHistory);

            if (this._redo.length > 0)
                this._redo.length = 0;//clear array
        }
    }

    public undo(times: number = 1): void {
        throw new Error("Method not implemented.");
    }

    public redo(times: number = 1): void {
        throw new Error("Method not implemented.");
    }

    public getHistory(): { name: string, isPast: boolean; }[] {
        throw new Error("Method not implemented.");
    }


}
