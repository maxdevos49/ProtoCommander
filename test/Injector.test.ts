import { Injector } from "../src/Injector.js";
import { service } from "../src/decorators/service.js";
import { ServiceCollection } from "../src/ServiceCollection.js";

const expect = chai.expect;

//#region Setup

@service()
class TestWithNoArguments {

    public test: boolean = false;

    constructor() {

    }

}

@service()
class TestWithArguments {

    public test2: boolean = true;

    constructor(test: TestWithNoArguments, test2: TestWithNoArguments) {

    }
}

//#endregion

describe("Injector.serviceCollection", () => {
    it("Should have the property serviceCollection", () => {
        expect(Injector).to.have.property("serviceCollection");
    });

    it("Should be an instance of ServiceCollection", () => {
        expect(Injector.serviceCollection).to.be.instanceOf(ServiceCollection);
    });
});

describe("Injector.resolve", () => {

    it("Should throw an exception if the function is not constructable", () => {
        expect(() => Injector.resolve(null)).to.throw(new TypeError("The constructor supplied is not constructable"));
        expect(() => Injector.resolve(undefined)).to.throw(new TypeError("The constructor supplied is not constructable"));
    });

    it("Should return a proper instance of the given object without arguments", () => {
        expect(Injector.resolve(TestWithNoArguments)).to.be.instanceOf(TestWithNoArguments);
    });

    it("Should return a proper instance of the given object with arguments", () => {
        expect(Injector.resolve(TestWithArguments)).to.be.instanceOf(TestWithArguments);
    });

});