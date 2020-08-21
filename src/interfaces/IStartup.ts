import { IServiceCollection } from "./IServiceCollection.js";
import { ProtoCommand } from "../ProtoCommand.js";

export interface IStartup {

    configureServices(services: IServiceCollection): void;
    configureApp(app: ProtoCommand): void;

}