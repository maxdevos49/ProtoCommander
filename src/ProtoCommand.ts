import { IProtoCommand } from "./interfaces/IProtoCommand.js";
import { IServiceCollection } from "./interfaces/IServiceCollection.js";
import { IActionExtension } from "./interfaces/IActionExtension.js";
import { ServiceCollection } from "./ServiceCollection.js";

export class ProtoCommand implements IProtoCommand {
    public readonly serviceCollection: IServiceCollection;

    constructor() {
        this.serviceCollection = new ServiceCollection();
    }

    registerExtension<T extends IActionExtension>(extension: IActionExtension): void {
        throw new Error("Method not implemented.");
    }
    configureExtension<T extends IActionExtension>(extension: IActionExtension, configureCallback: (extension: T) => void): void {
        throw new Error("Method not implemented.");
    }
    activateExtensionHook(hookCallback: (extension: import("./interfaces/IActionExtension.js").IActionExtension) => void): void {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }

}