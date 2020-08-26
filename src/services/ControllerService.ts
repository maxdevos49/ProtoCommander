import { service } from "../decorators/service.js";

@service()
export class ControllerService {

    controller() {

    }

    public registerController<T>(controller: new (...args: any[]) => T): void {
        throw new Error("Method not implemented.");
    }

    public getController<T>(controller: new (...args: any[]) => T): T {
        throw new Error("Method not implemented.");
    }

    public getAllControllers(): any[] {
        throw new Error("Method not implemented.");
    }

}