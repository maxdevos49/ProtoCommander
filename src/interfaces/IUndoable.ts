import { Observable } from "../Observable.js";

export interface IUndoable<T> {


    $state: Observable<T>;

    pushState(data: T): void;

    getState(): T;

}