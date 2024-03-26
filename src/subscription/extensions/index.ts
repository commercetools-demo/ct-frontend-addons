import { ActionCreator, ActionWrapper, MergableAction } from "../../utils/types";
import { Configuration } from "../types";
import { addToCart } from "./actionControllers/CartController";
import { getAllSubscriptions } from "./actionControllers/SubscriptionController";

const subscription: {
    actions: MergableAction<Configuration>[];
  } = {
    actions: [
      {
        action: 'addToCart',
        actionNamespace: 'cart',
        hook: addToCart as ActionWrapper<Configuration>,
        create: true,
      },
      {
        action: 'getAllSubscriptions',
        actionNamespace: 'subscription',
        hook: getAllSubscriptions as ActionCreator<Configuration>,
        create: true,
      },
    ],
  };
  
  export default subscription;
  