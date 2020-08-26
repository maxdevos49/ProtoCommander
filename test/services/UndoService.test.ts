import { IUndoable } from "../../src/interfaces/IUndoable.js";
import { Observable, Subject } from "../../src/Observable.js";
import { UndoService } from "../../src/services/UndoService.js";

const expect = chai.expect;

interface IData {
    prop1: string;
    prop2: number;
}
class TestHistory implements IUndoable<IData>{

    public readonly $state: Observable<IData>;


    private _state: IData;
    private readonly _stateSub: Subject<IData>;


    private readonly _undo: UndoService;


    constructor(undo: UndoService) {
        this._undo = undo;

        this._stateSub = new Subject();
        this.$state = this._stateSub.toObservable();

        this.pushState({
            prop1: "Hi",
            prop2: 0
        });
    }

    public increment(): void {
        let state = this.getState();

        let newState = {
            ...state,
        };

        newState.prop2++;

        this.pushState(newState);
    }

    public pushState(data: IData): void {

        Object.freeze(data);

        this._state = data;
        this._stateSub.next(data);
        this._undo.add("Test History", this, data);
    }

    public getState(): IData {
        return this._state;
    }


}


describe("UndoService.constructor", () => {

});

describe("UndoService.addGroup", () => {

});

describe("UndoService.add", () => {

});

describe("UndoService.undo", () => {

});

describe("UndoService.redo", () => {

});