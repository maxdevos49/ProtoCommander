import { IServiceCollection } from "./IServiceCollection.js";
import { IActionExtension } from "./IActionExtension.js";

export interface IProtoCommand {

    serviceCollection: IServiceCollection;

    registerExtension<T extends IActionExtension>(extension: IActionExtension): void;
    configureExtension<T extends IActionExtension>(extension: IActionExtension, configureCallback: (extension: T) => void): void;

    activateExtensionHook(hookCallback: (extension: IActionExtension) => void): void;

    init(): void;
}