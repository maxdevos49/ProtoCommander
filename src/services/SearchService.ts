import { service } from "../decorators/service.js";
import { ISearchComponent } from "../interfaces/ISearchComponent.js";

@service()
export class SearchService {

    constructor() {

    }

    public getText(): string {
        throw new Error("Method not implemented.");
    }

    public setText(text: string): void {
        throw new Error("Method not implemented.");
    }

    public appendText(text: string): void {
        throw new Error("Method not implemented.");
    }

    public clear(): void {
        throw new Error("Method not implemented.");
    }

    public focus(): void {
        throw new Error("Method not implemented.");
    }

    public blur(): void {
        throw new Error("Method not implemented.");
    }

    public setError(error: string): void {
        throw new Error("Method not implemented.");
    }

    public clearError(): void {
        throw new Error("Method not implemented.");
    }

    public registerSearchComponent(searchComponent: ISearchComponent): void {
        throw new Error("Method not implemented.");
    }

    public activateComponent(action: (component: ISearchComponent) => void): void {
        throw new Error("Method not implemented.");
    }

}