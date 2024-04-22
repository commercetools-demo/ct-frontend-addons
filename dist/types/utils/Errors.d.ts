export type ErrorData = {
    message: string;
    errors?: never;
};
export type ErrorProps = ErrorData | {
    message?: never;
    errors: ErrorData[];
};
export type ExternalErrorProps = {
    status: number;
    body?: string;
} & ErrorProps;
export declare abstract class ExtensionError extends Error {
    protected code?: string;
    errors: ErrorData[];
    protected constructor({ message, errors }: ErrorProps);
}
export declare class ValidationError extends ExtensionError {
    constructor(options: ErrorProps);
}
export declare class ExternalError extends ExtensionError {
    status: number;
    body?: string | Record<string, unknown>;
    constructor(options: ExternalErrorProps);
}
//# sourceMappingURL=Errors.d.ts.map