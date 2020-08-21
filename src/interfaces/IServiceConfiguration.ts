export interface IServiceConfiguration<T> {
    service: new (...args: any[]) => T;
    configuration?: (service: T) => void;
}