/// <reference types="react" />
declare const useRefinements: () => {
    limit: number;
    page: number;
    setLimit: import("react").Dispatch<import("react").SetStateAction<number>>;
    cursor: string;
    setCursor: import("react").Dispatch<import("react").SetStateAction<string>>;
    states: string[];
    addState: (state: string) => void;
    removeState: (state: string) => void;
    setStates: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    search: string;
    debouncedSearch: string;
    setSearch: import("react").Dispatch<import("react").SetStateAction<string>>;
    date: {
        from?: Date | undefined;
        to?: Date | undefined;
    };
    ISODate: {
        from?: string | undefined;
        to?: string | undefined;
    };
    onCreationDateRefine: import("react").Dispatch<import("react").SetStateAction<{
        from?: Date | undefined;
        to?: Date | undefined;
    }>>;
    clearRefinements: () => void;
};
export default useRefinements;
//# sourceMappingURL=index.d.ts.map