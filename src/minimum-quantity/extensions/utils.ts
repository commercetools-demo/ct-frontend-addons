import { Dependencies } from "../types";
import { injectCartApi } from "./apis";

export const extractDependency = (dependency: string, dependencies?: Dependencies): any => {
  if (dependencies?.[dependency]) {
    return injectCartApi(dependencies[dependency]);
  }
};
