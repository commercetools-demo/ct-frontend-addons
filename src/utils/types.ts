import { ActionHandler } from '@frontastic/extension-types';
import { Dependencies as MinimumQuantityDependencies } from '../minimum-quantity/types';

export type UnionDependencies = MinimumQuantityDependencies;

export interface MergableAction {
  actionNamespace: string;
  action: string;
  hook: (originalCb: ActionHandler, config?: GeneralConfiguration) => ActionHandler;
}

export interface AddOnRegistry {
  actions: MergableAction[];
}

export interface GeneralConfiguration { 
  dependencies: UnionDependencies;
  props: Record<string, any>;
}
