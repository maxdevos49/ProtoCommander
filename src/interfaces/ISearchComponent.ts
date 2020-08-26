export interface ISearchComponent {
    onFocus?(): void;

    onBlur?(): void;

    onInput?(key: string): void;

    onChange?(): void;

    onSubmit?(): void;

    onError?(): void;
}