import { ProtoCommandBuilder } from "../src/ProtoCommandBuilder.js";
import { IStartup } from "../src/interfaces/IStartup.js";
import { IServiceCollection } from "../src/interfaces/IServiceCollection.js";
import { ProtoCommand } from "../src/ProtoCommand.js";

const expect = chai.expect;

describe("ProtoCommandBuilder.buildConfiguration", () => {

    it("Should return a ProtoCommandBuilder object", () => {
        expect(ProtoCommandBuilder.buildConfiguration() instanceof ProtoCommandBuilder).equal(true);
    });

    it("Should return a ProtoCommandBuilder object when also given a configuration", () => {
        expect(ProtoCommandBuilder.buildConfiguration({
            title: "My Project"
        }) instanceof ProtoCommandBuilder).equal(true);
    });

});

class TestStartup implements IStartup {
    configureServices(services: IServiceCollection): void { }
    configureApp(app: ProtoCommand): void { }
}

describe("ProtoCommandBuilder.startup", () => {

    it("Should return a ProtoCommandBuilder object", () => {
        expect(ProtoCommandBuilder.buildConfiguration().startup(TestStartup) instanceof ProtoCommandBuilder).equal(true);
    });

});

describe("ProtoCommandBuilder.run", () => {
    it("Should return nothing", () => {
        expect(ProtoCommandBuilder.buildConfiguration().startup(TestStartup).run()).equal(undefined);
    });
});