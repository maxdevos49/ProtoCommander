import { IActionExtension } from "./IActionExtension.js";

export interface IProtoCommand {

    registerExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): void;
    configureExtension<T extends IActionExtension>(extension: new (...args: any[]) => T, configureCallback: (extension: T) => void): void;
    hasExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): boolean;
    getExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): T;
    activateExtensionHook(hookCallback: (extension: IActionExtension) => void): void;

    init(): void;
}


//experimenting
// interface IExtendable<T> {
//     register<R extends T>(extension: new (...args: any[]) => R): void;
//     configure<R extends T>(extension: new (...args: any[]) => R, configureCallback: (extension: R) => void): void;
//     has<R extends T>(extension: new (...args: any[]) => R): boolean;
//     get<R extends T>(extension: new (...args: any[]) => R): R;

//     activateHook(hookCallback: (extension: T) => void): void;
// }