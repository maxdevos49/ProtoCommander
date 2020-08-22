import { Injector } from "../src/Injector.js";
import { service } from "../src/decorators/service.js";

const expect = chai.expect;

//#region Test Classes

@service()
class Test {
    public hey: string = "hey";
    constructor() {

    }
}

@service()
class Test2 {

    public bye: string = "bye";

    constructor(test: Test, test2: Test) {

    }
}

//#endregion

describe("ServiceCollection.addSingleton", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should return nothing", () => {
        expect(serviceCollection.addSingleton(Test)).to.equal(undefined);
    });

    it("Should only accept constructors", () => {
        expect(() => serviceCollection.addSingleton(null)).to.throw("Service must be a valid constructor.");
        expect(() => serviceCollection.addSingleton(undefined)).to.Throw("Service must be a valid constructor.");
    });

    it("Should throw a Error if the service is registered already", () => {
        expect(() => serviceCollection.addSingleton(Test)).to.throw(`Service: ${Test.name} is already registered.`);
    });

});

describe("ServiceCollection.addTransient", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should return nothing", () => {
        expect(serviceCollection.addTransient(Test2)).to.equal(undefined);
    });

    it("Should only accept constructors", () => {
        expect(() => serviceCollection.addTransient(null)).to.throw("Service must be a valid constructor.");
        expect(() => serviceCollection.addTransient(undefined)).to.throw("Service must be a valid constructor.");
    });

    it("Should throw an Error if the service is registered already", () => {
        expect(() => serviceCollection.addTransient(Test)).to.throw(`Service: ${Test.name} is already registered.`);
    });

});

describe("ServiceCollection.configure", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should return nothing", () => {
        expect(serviceCollection.configure(Test, () => { })).to.equal(undefined);
    });

    it("Should throw an Error if the service is already configured", () => {
        expect(() => serviceCollection.configure(Test, () => { })).to.throw("Service can only be configured once.");
    });

    it("Should throw an Error if the service key is not valid", () => {
        expect(() => serviceCollection.configure(null, () => { })).to.throw("Service key must be valid.");
        expect(() => serviceCollection.configure(undefined, () => { })).to.throw("Service key must be valid.");
    });

    it("Should throw an Error if the configuration callback is not valid", () => {
        expect(() => serviceCollection.configure(Test, null)).to.throw("Configuration callback must be valid.");
        expect(() => serviceCollection.configure(Test, undefined)).to.throw("Configuration callback must be valid.");
    });

});

describe("ServiceCollection.getService", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should throw an error when the service key is not valid", () => {
        expect(() => serviceCollection.getService(null)).to.throw("Service key must be valid.");
        expect(() => serviceCollection.getService(undefined)).to.throw("Service key must be valid.");
        expect(() => serviceCollection.getService(Boolean)).to.throw("Service key must be valid.");
    });

    it("Should return the requested service", () => {
        expect(serviceCollection.getService(Test)).to.be.instanceOf(Test);
        expect(serviceCollection.getService(Test2)).to.be.instanceOf(Test2);
    });

    it("Should different instances of a transient service", () => {
        expect(serviceCollection.getService(Test2)).to.not.equal(serviceCollection.getService(Test2));
    });

    it("Should return the same instance of a singleton service each time", () => {
        expect(serviceCollection.getService(Test)).to.equal(serviceCollection.getService(Test));
    });
});

describe("ServiceCollection.hasService", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should return false for services that are not registered or are not valid", () => {
        expect(serviceCollection.hasService(null)).to.equal(false);
        expect(serviceCollection.hasService(Boolean)).to.equal(false);
        expect(serviceCollection.hasService(undefined)).to.equal(false);
    });

    it("Should return true for services that are registered", () => {
        expect(serviceCollection.hasService(Test)).to.equal(true);
        expect(serviceCollection.hasService(Test2)).to.equal(true);
    });

});

describe("ServiceCollection.isSingleton", () => {

    let serviceCollection = Injector.serviceCollection;

    it("Should return false if the service is not a singleton or is not registered", () => {
        expect(serviceCollection.isSingleton(null)).to.equal(false);
        expect(serviceCollection.isSingleton(Boolean)).to.equal(false);
        expect(serviceCollection.isSingleton(undefined)).to.equal(false);
    });

    it("Should return true if the service is registered as a singleton", () => {
        expect(serviceCollection.isSingleton(Test)).to.equal(true);
    });
});

describe("ServiceCollection.hasInstance", () => {
    let serviceCollection = Injector.serviceCollection;

    it("Should return false if the service is not registered, invalid, or does not have a instance", () => {
        expect(serviceCollection.hasInstance(null)).to.equal(false);
        expect(serviceCollection.hasInstance(Boolean)).to.equal(false);
        expect(serviceCollection.hasInstance(undefined)).to.equal(false);
    });

    it("Should return true if the service is registered and already has a instance", () => {
        expect(serviceCollection.hasInstance(Test)).to.equal(true);
    });
});

describe("ServiceCollection.hasConfiguration", () => {
    let serviceCollection = Injector.serviceCollection;

    it("Should return false if the service is invalid or is not registered", () => {
        expect(serviceCollection.hasConfiguration(null)).to.equal(false);
        expect(serviceCollection.hasConfiguration(undefined)).to.equal(false);
        expect(serviceCollection.hasConfiguration(Boolean)).to.equal(false);
        expect(serviceCollection.hasConfiguration(Test2)).to.equal(false);
    });

    it("Should return true if the service has a registered configuration", () => {
        expect(serviceCollection.hasConfiguration(Test)).to.equal(true);
    });
});

describe("ServiceCollection.getConfiguration", () => {
    let serviceCollection = Injector.serviceCollection;

    it("Should throw an exception if the service is invalid or not registered", () => {
        expect(() => serviceCollection.getConfiguration(null)).to.throw("Service must be a valid constructor and be registered as a service.");
        expect(() => serviceCollection.getConfiguration(undefined)).to.throw("Service must be a valid constructor and be registered as a service.");
        expect(() => serviceCollection.getConfiguration(Boolean)).to.throw("Service must be a valid constructor and be registered as a service.");
    });

    it("Should throw an exception if the service is registered but does not have a configuration", () => {
        expect(() => serviceCollection.getConfiguration(Test2)).to.throw("Service does not have a registered configuration.");
    });

    it("Should return a function that", () => {
        expect(serviceCollection.getConfiguration(Test)).to.be.a("function");
    });
});