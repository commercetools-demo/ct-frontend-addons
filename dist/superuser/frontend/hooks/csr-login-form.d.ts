declare const useCSRLoginForm: ({ sdk, data, setError, formatMessage, onLogin, }: {
    sdk: any;
    data: any;
    setError: (message: string) => void;
    formatMessage: (params: {
        id: string;
        defaultMessage: string;
    }) => string;
    onLogin?: (() => void) | undefined;
}) => {
    isCSRLogin: boolean;
    csrErrorHandler: (error: Error) => void;
    login: () => void;
};

export { useCSRLoginForm };
