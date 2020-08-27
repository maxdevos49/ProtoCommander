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

describe("UndoService.addGroup", () => {
    let instance = new UndoService();

    it("Should throw an exception if the history name is not valid", () => {
        expect(() => instance.addGroup(null, null)).to.throw("History name must be a valid string at least 1 character long");
        expect(() => instance.addGroup(undefined, null)).to.throw("History name must be a valid string at least 1 character long");
    });

    it("Should throw an exception if the actions callback is not valid", () => {
        expect(() => instance.addGroup("Test Group", null)).to.throw("The actions callback is not valid");
        expect(() => instance.addGroup("Test Group", undefined)).to.throw("The actions callback is not valid");
    });

    it("Should return nothing or undefined", () => {
        expect(instance.addGroup("Test Group", () => { })).to.equal(undefined);
    });

});

describe("UndoService.add", () => {
    let instance = new UndoService();
    let testService = new TestHistory(instance);

    it("Should throw an exception if the history name is not valid", () => {
        expect(() => instance.add(null, null, null)).to.throw("History name must be a valid string at least 1 character long");
        expect(() => instance.add(undefined, null, null)).to.throw("History name must be a valid string at least 1 character long");
    });

    it("Should throw an exception if the target is not a valid object", () => {
        expect(() => instance.add("Test", null, null)).to.throw("The undoable target is not valid.");
        expect(() => instance.add("Test", undefined, null)).to.throw("The undoable target is not valid.");
    });

    it("Should throw an exception if the new data is null or undefined", () => {
        expect(() => instance.add("Test", testService, null)).to.throw("Data must not be null or undefined.");
        expect(() => instance.add("Test", testService, undefined)).to.throw("Data must not be null or undefined.");
    });

    it("Should return nothing or undefined after a successful add", () => {
        expect(instance.add("Test", testService, {
            prop1: "Hi",
            prop2: 5
        })).to.equal(undefined);
    });

});

describe("UndoService.undo", () => {

});

describe("UndoService.redo", () => {

});

describe("UndoService.getHistory", () => {
    let instance = new UndoService();

    it("Should return a empty array", () => {
        expect(instance.getHistory().length).to.equal(0);
    });

    it("Should return an array with length of 1", () => {
        // instance.add("name", )//TODO add one

        expect(instance.getHistory().length).to.equal(1);
    });//TODO rest of scenarios
});