import "./ReflectMetadata.js";

import { IConfiguration } from "./interfaces/IConfiguration.js";
import { IStartup } from "./interfaces/IStartup.js";
import { ProtoCommand } from "./ProtoCommand.js";
import { Injector } from "./Injector.js";


export class ProtoCommandBuilder<T> {

    private readonly _configuration: IConfiguration;

    private _startup: new (config: IConfiguration) => IStartup;

    /**
     * Used to build and configure a ProtoCommand object
     */
    constructor(configuration: IConfiguration) {
        this._configuration = configuration;
    }

    public static buildConfiguration<R>(configuration?: IConfiguration): ProtoCommandBuilder<R> {

        if (typeof configuration !== "object") {
            configuration = {
                title: "ProtoCommand",
            };
        }

        return new ProtoCommandBuilder<R>(configuration);
    }

    public startup(startup: new (config: IConfiguration) => IStartup): ProtoCommandBuilder<T> {
        this._startup = startup;

        return this;
    }

    public run(): void {

        let protoCommand = new ProtoCommand(this._configuration);
        let startup = new this._startup(this._configuration);

        startup.configureServices(Injector.serviceCollection);

        startup.configureApp(protoCommand);

        protoCommand.init();

        return;
    }



};