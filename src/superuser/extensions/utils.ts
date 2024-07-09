import { Dependencies } from "../types";
import { injectAccountApi } from "./apis/AccountApi";
import { injectCartApi } from "./apis/CartApi";
import { injectCartMapper } from "./mappers/CartMapper";

export const extractDependency = (dependency: keyof Dependencies, dependencies?: Dependencies): any => {
  if (dependencies?.[dependency]) {
    switch (dependency) {
      case 'CartApi':
        return injectCartApi(dependencies.CartApi, extractDependency('CartMapper', dependencies));
      case 'AccountApi':
        return injectAccountApi(dependencies.AccountApi, extractDependency('AccountMapper', dependencies));
      case 'AccountMapper':
        return dependencies.AccountMapper;
      case 'CartMapper':
        return injectCartMapper(dependencies.CartMapper);
    }
  }
};
