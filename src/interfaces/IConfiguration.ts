import { IServiceConfiguration } from "./IServiceConfiguration.js";

export interface IConfiguration {
    title: string;
    services?: IServiceConfiguration<any>;
    custom?: any;
}