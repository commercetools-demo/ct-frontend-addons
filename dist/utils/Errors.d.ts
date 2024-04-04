type ErrorData = {
    message: string;
    errors?: never;
};
type ErrorProps = ErrorData | {
    message?: never;
    errors: ErrorData[];
};
type ExternalErrorProps = {
    status: number;
    body?: string;
} & ErrorProps;
declare abstract class ExtensionError extends Error {
    protected code?: string;
    errors: ErrorData[];
    protected constructor({ message, errors }: ErrorProps);
}
declare class ValidationError extends ExtensionError {
    constructor(options: ErrorProps);
}
declare class ExternalError extends ExtensionError {
    status: number;
    body?: string | Record<string, unknown>;
    constructor(options: ExternalErrorProps);
}

export { type ErrorData, type ErrorProps, ExtensionError, ExternalError, type ExternalErrorProps, ValidationError };
