import {
  injectCartApi
} from "./chunk-QOINXJVZ.js";

// src/minimum-quantity/extensions/utils.ts
var extractDependency = (dependency, dependencies) => {
  if (dependencies?.[dependency]) {
    return injectCartApi(dependencies[dependency]);
  }
};

export {
  extractDependency
};
