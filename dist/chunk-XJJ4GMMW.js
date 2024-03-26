import {
  injectAccountApi
} from "./chunk-XSBXE5WT.js";
import {
  injectCartApi
} from "./chunk-KCHEU6M2.js";
import {
  injectAccountMapper
} from "./chunk-UHABTCSP.js";
import {
  injectCartMapper
} from "./chunk-WXW4M2NJ.js";

// src/superuser/extensions/utils.ts
var extractDependency = (dependency, dependencies) => {
  if (dependencies?.[dependency]) {
    switch (dependency) {
      case "CartApi":
        return injectCartApi(dependencies.CartApi, extractDependency("CartMapper", dependencies));
      case "AccountApi":
        return injectAccountApi(dependencies.AccountApi, extractDependency("AccountMapper", dependencies));
      case "AccountMapper":
        return injectAccountMapper(dependencies.AccountMapper);
      case "CartMapper":
        return injectCartMapper(dependencies.CartMapper);
    }
  }
};

export {
  extractDependency
};
