import { Context, Request } from '@frontastic/extension-types';
import { ApprovalFlow } from '../types/approval/Flow';
import { Configuration } from '../types';
import { ApprovalRule } from '../types/approval/Rule';
export default class ApprovalRouter {
    static identifyRuleFrom(request: Request): boolean;
    static identifyFlowFrom(request: Request): boolean;
    static loadFlowFor: (request: Request, frontasticContext: Context, configuration: Configuration) => Promise<ApprovalFlow | null>;
    static loadRuleFor: (request: Request, frontasticContext: Context, configuration: Configuration) => Promise<ApprovalRule | null>;
}
//# sourceMappingURL=ApprovalRouter.d.ts.map