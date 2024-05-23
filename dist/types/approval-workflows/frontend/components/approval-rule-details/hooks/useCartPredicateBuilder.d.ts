declare const useCartPredicateBuilder: (sdk: any, translate: (key: string) => string) => {
    fields: Record<string, {
        label: string;
        type: string;
        fieldSettings?: {
            listValues?: string[] | undefined;
        } | undefined;
    } | undefined>;
    isReady: boolean;
};
export default useCartPredicateBuilder;
//# sourceMappingURL=useCartPredicateBuilder.d.ts.map