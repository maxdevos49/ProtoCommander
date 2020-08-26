import { ProtoCommand } from "../src/ProtoCommand.js";
import { extension } from "../src/decorators/extension.js";
import { Test } from "mocha";
import { IActionExtension } from "../src/interfaces/IActionExtension.js";

const expect = chai.expect;

//#region TestExtension

@extension()
class TestExtension implements IActionExtension {
    public testProp: string;
    private time: number = 0;
    onInit(): void {
        this.time++;
        this.testProp = "init" + this.time;
    }
}

//#endregion

describe("ProtoCommand.constructor", () => {

    it("Should throw an exception if the configuration is not supplied", () => {
        expect(() => new ProtoCommand(null)).to.throw("Constructor must be supplied with a valid configuration.");
        expect(() => new ProtoCommand(undefined)).to.throw("Constructor must be supplied with a valid configuration.");
        expect(() => new ProtoCommand({ title: null })).to.throw("Constructor must be supplied with a valid configuration.");
        expect(() => new ProtoCommand({ title: undefined })).to.throw("Constructor must be supplied with a valid configuration.");
    });

    it("Should return a new instance that reflects the configuration", () => {

        expect(new ProtoCommand({
            title: "Test Title",
            description: "Test Description",
        })).to.be.an.instanceof(ProtoCommand);

        expect(ProtoCommand.title).to.equal("Test Title");
        expect(ProtoCommand.description).to.equal("Test Description");
    });
});

describe("ProtoCommand.registerExtension", () => {

    let instance = new ProtoCommand({
        title: "Test Title",
        description: "Test Description",
    });

    it("Should return nothing", () => {
        expect(instance.registerExtension(TestExtension)).to.equal(undefined);
    });

    it("Should throw an error if the extension is not valid", () => {
        expect(() => instance.registerExtension(null)).to.throw("The extension provided is not valid.");
        expect(() => instance.registerExtension(undefined)).to.throw("The extension provided is not valid.");
    });

    it("Should throw an exception if the extension is already registered", () => {
        expect(() => instance.registerExtension(TestExtension)).to.throw("Extension has already been registered.");
    });
});

describe("ProtoCommand.configureExtension", () => {

    let instance = new ProtoCommand({
        title: "Test Title",
        description: "Test Description",
    });

    it("Should throw an exception if the extension is not registered or invalid", () => {
        expect(() => instance.configureExtension(TestExtension, (ext) => { })).to.throw("Cannot configure extension that is not registered.");
        expect(() => instance.configureExtension(null, (ext) => { })).to.throw("Cannot configure extension that is not registered.");
        expect(() => instance.configureExtension(undefined, (ext) => { })).to.throw("Cannot configure extension that is not registered.");
    });


    it("Should throw an exception if the configuration callback is not valid", () => {
        instance.registerExtension(TestExtension);
        expect(() => instance.configureExtension(TestExtension, null)).to.throw("The configuration callback must be a function.");
        expect(() => instance.configureExtension(TestExtension, undefined)).to.throw("The configuration callback must be a function.");
    });

    it("Should return nothing", () => {
        expect(instance.configureExtension(TestExtension, (ext) => {
            ext.testProp = "Test Passed???";
        }));
    });

    it("Should update the extensions property after configuration", () => {
        expect(instance.getExtension(TestExtension).testProp).to.equal("Test Passed???");
    });

});

describe("ProtoCommand.hasExtension", () => {

    let instance = new ProtoCommand({
        title: "Test Title",
        description: "Test Description",
    });

    it("Should return false for any unregistered or invalid extensions", () => {
        expect(instance.hasExtension(null)).to.equal(false);
        expect(instance.hasExtension(undefined)).to.equal(false);
    });

    instance.registerExtension(TestExtension);

    it("Should return true for any registered extensions", () => {
        expect(instance.hasExtension(TestExtension)).to.equal(true);
    });

});

describe("ProtoCommand.getExtension", () => {

    let instance = new ProtoCommand({
        title: "Test Title",
        description: "Test Description",
    });

    it("Should throw an exception if the extension does not exist", () => {
        expect(() => instance.getExtension(null)).to.throw("Extension does not exist.");
        expect(() => instance.getExtension(undefined)).to.throw("Extension does not exist.");
    });

    instance.registerExtension(TestExtension);

    it("Should return the correct instance", () => {
        expect(instance.getExtension(TestExtension)).to.be.an.instanceof(TestExtension);
    });

    it("It should get the same instance on every request", () => {
        expect(instance.getExtension(TestExtension)).to.equal(instance.getExtension(TestExtension));
    });

});

describe("ProtoCommand.activateExtensionHook", () => {

    let instance = new ProtoCommand({
        title: "Test Title",
        description: "Test Description",
    });

    it("Should throw an exception if the hook callback is not valid", () => {

        instance.registerExtension(TestExtension);

        expect(() => instance.activateExtensionHook(null)).to.throw("Extension hook activator is invalid.");
        expect(() => instance.activateExtensionHook(undefined)).to.throw("Extension hook activator is invalid.");
        expect(() => instance.activateExtensionHook((ext) => ext)).to.not.throw();
    });

    it("Should activate the specific hook in all registered extensions", () => {
        instance.activateExtensionHook((ext) => ext.onInit());
        expect(instance.getExtension(TestExtension).testProp).to.equal("init1");
        instance.activateExtensionHook((ext) => ext.onInit());
        expect(instance.getExtension(TestExtension).testProp).to.equal("init2");
    });

});