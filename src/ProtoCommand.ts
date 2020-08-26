import { IProtoCommand } from "./interfaces/IProtoCommand.js";
import { IActionExtension } from "./interfaces/IActionExtension.js";
import { IConfiguration } from "./interfaces/IConfiguration.js";
import { Injector } from "./Injector.js";


export class ProtoCommand implements IProtoCommand {

    public static title: string;
    public static description: string;

    private static configuration: IConfiguration;

    private readonly _extensions: Map<new (...args: any[]) => IActionExtension, IActionExtension>;

    constructor(configuration: IConfiguration) {

        if (typeof configuration !== "object" || typeof configuration?.title !== "string" || configuration.title.length === 0)
            throw new TypeError("Constructor must be supplied with a valid configuration.");

        ProtoCommand.title = configuration.title;
        ProtoCommand.description = configuration.description ?? "No description.";
        ProtoCommand.configuration = configuration;

        this._extensions = new Map();
    }

    public static getConfig<T>(configKey: string): T {

        if (ProtoCommand.configuration)
            throw new Error("Configuration has not been initialized.");

        if (typeof configKey !== "string" || configKey.length === 0)
            throw new TypeError("The config key was not a valid string");

        return (ProtoCommand.configuration as any)[configKey];
    }

    public registerExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): void {

        if (typeof extension !== "function")
            throw new TypeError("The extension provided is not valid.");

        if (this._extensions.has(extension))
            throw new Error("Extension has already been registered.");

        this._extensions.set(extension, Injector.resolve(extension));
    }

    public configureExtension<T extends IActionExtension>(extension: new (...args: any[]) => T, configureCallback: (extension: T) => void): void {

        if (!this._extensions.has(extension))
            throw new Error("Cannot configure extension that is not registered.");

        if (typeof configureCallback !== "function")
            throw new TypeError("The configuration callback must be a function.");

        configureCallback(this._extensions.get(extension) as T);
    }

    public hasExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): boolean {
        return this._extensions.has(extension);
    }

    public getExtension<T extends IActionExtension>(extension: new (...args: any[]) => T): T {
        if (!this._extensions.has(extension))
            throw new Error("Extension does not exist.");

        return this._extensions.get(extension) as T;
    }

    public activateExtensionHook(hookCallback: (extension: IActionExtension) => void): void {

        if (typeof hookCallback !== "function")
            throw new Error("Extension hook activator is invalid.");

        this._extensions.forEach((ext) => {
            hookCallback(ext);
        });

    }

    public init(): void {
        this.activateExtensionHook((ext) => ext.onInit?.());

        //TODO do something here i forgot??

        this.activateExtensionHook((ext) => ext.onReady?.());
    }

}