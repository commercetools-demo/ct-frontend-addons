import React from 'react';
import { RuleComponents } from '.';
type Props = {
    onError: () => void;
    onPreview: () => void;
    onUpdate: (predicate: string) => void;
    onUpdateJson: (predicate: any) => void;
    predicate: string;
    predicateJsonFormat: any;
    components: RuleComponents;
    fields: any;
    translate: (translationKey: string) => string;
};
declare const PredicateBuilder: React.FC<Props>;
export default PredicateBuilder;
//# sourceMappingURL=predicate-builder.d.ts.map