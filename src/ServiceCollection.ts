import { IServiceCollection } from "./interfaces/IServiceCollection.js";
import { Injector } from "./Injector.js";

enum ServiceType {
    Transient,
    Singleton,
}

interface IServiceDefinition {
    serviceType: ServiceType;
    serviceConfiguration?: (service: any) => void;
}

/**
 * Used to Manage, register, and configure services
 */
export class ServiceCollection implements IServiceCollection {

    private readonly _singletonInstances: Map<new (...args: any) => any, any>;
    private readonly _services: Map<new (...args: any) => any, IServiceDefinition>;

    /**
     * Constructs a new Service Collection
     */
    constructor() {
        this._singletonInstances = new Map();
        this._services = new Map();
    }

    public addSingleton<T>(service: new (...args: any[]) => T): void {

        if (typeof service !== "function")
            throw new TypeError("Service must be a valid constructor.");

        if (this._services.has(service))
            throw new Error(`Service: ${service.name} is already registered.`);

        //Create singleton before registering as singleton so we don't get a recursive loop
        // this._singletonInstances.set(service, Injector.resolve(service));

        this._services.set(service, {
            serviceType: ServiceType.Singleton
        });
    }

    public addTransient<T>(service: new (...args: any[]) => T): void {

        if (typeof service !== "function")
            throw new TypeError("Service must be a valid constructor.");

        if (this._services.has(service))
            throw new Error(`Service: ${service.name} is already registered.`);

        this._services.set(service, {
            serviceType: ServiceType.Transient
        });
    }

    public configure<T>(service: new (...args: any[]) => T, configureCallback: (service: T) => void): void {

        if (typeof service !== "function" || !this._services.has(service))
            throw new TypeError("Service key must be valid.");

        if (typeof configureCallback !== "function")
            throw new TypeError("Configuration callback must be valid.");

        let serviceDefinition = this._services.get(service);

        if (serviceDefinition.serviceConfiguration)
            throw new Error("Service can only be configured once.");

        this._services.set(service, {
            serviceType: serviceDefinition.serviceType,
            serviceConfiguration: configureCallback
        });

    }

    public getService<T>(service: new (...args: any[]) => T): T | null {

        if (!this._services.has(service))
            throw new TypeError("Service key must be valid.");

        let serviceDefinition = this._services.get(service);

        if (serviceDefinition.serviceType === ServiceType.Transient) {
            return Injector.resolve(service);
        } else if (serviceDefinition.serviceType === ServiceType.Singleton) {

            if (this._singletonInstances.has(service))
                return this._singletonInstances.get(service);

            let instance = Injector.resolve(service);
            this._singletonInstances.set(service, instance);

            return instance;
        }

        return null;
    }

    public hasService<T>(service: new (...args: any[]) => T): boolean {
        return this._services.has(service);
    }

    public isSingleton<T>(service: new (...args: any[]) => T): boolean {
        if (!this._services.has(service))
            return false;

        return this._services.get(service).serviceType === ServiceType.Singleton;
    }

    public hasInstance<T>(service: new (...args: any[]) => T): boolean {
        return this._singletonInstances.has(service);
    }

}