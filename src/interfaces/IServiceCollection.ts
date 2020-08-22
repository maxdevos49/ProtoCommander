export interface IServiceCollection {

    /**
     * Registers a service as a singleton service meaning the service will only be instantiated once and then reused for every service request
     * @param service the service to be registered
     */
    addSingleton<T>(service: new (...args: any[]) => T): void;

    /**
     * Registers a service as a transient meaning the service will be instantiated every time it is requested
     * @param service 
     */
    addTransient<T>(service: new (...args: any[]) => T): void;

    /**
     * Defines a configuration for a given service. After a service is instantiated it will be passed to the configure callback to be configured in any way it needs.
     * @param service The service to configure
     * @param configureCallback The callback used to configure
     */
    configure<T>(service: new (...args: any[]) => T, configureCallback: (service: T) => void): void;

    /**
     * Gets a particular service. Correctly knows about transient and singleton services
     * @param service The service to retrieve
     */
    getService<T>(service: new (...args: any[]) => T): T | null;

    /**
     * Indicates if a given service is registered or not
     * @param service The service in question
     */
    hasService<T>(service: new (...args: any[]) => T): boolean;

    /**
     * Indicates if a given service is registered as a singleton or not.
     * @param service The service in question
     */
    isSingleton<T>(service: new (...args: any[]) => T): boolean;

    /**
     * Indicates if a given singleton service has a instance yet
     * @param service The service to check
     */
    hasInstance<T>(service: new (...args: any[]) => T): boolean;

    /**
     * Indicates if a given service has a configuration or not. Returns true if it does and false if it is unknown or does not.
     * @param service The service to check
     */
    hasConfiguration<T>(service: new (...args: any[]) => T): boolean;

    /**
     * Gets a given services configuration. 
     * @param service The target service
     */
    getConfiguration<T>(service: new (...args: any[]) => T): (service: T) => void;
}