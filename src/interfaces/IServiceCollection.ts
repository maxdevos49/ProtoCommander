export interface IServiceCollection {
    addSingleton<T>(service: new (...args: any[]) => T): void;
    addTransient<T>(service: new (...args: any[]) => T): void;
    configure<T>(service: new (...args: any[]) => T, configureCallback: (service: T) => void): void;
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

    hasInstance<T>(service: new (...args: any[]) => T): boolean;
}