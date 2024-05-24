import { Configuration } from "../types";
import { injectCartApi } from "./apis/CartApi";

export const extractDependency = (dependency: string, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    return injectCartApi(config?.dependencies[dependency]);
  }
};
