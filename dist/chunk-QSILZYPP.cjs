"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkPX5U6SIGcjs = require('./chunk-PX5U6SIG.cjs');



var _chunkTLTXMAELcjs = require('./chunk-TLTXMAEL.cjs');

// src/subscription/extensions/actionControllers/SubscriptionController.ts
var getAllSubscriptions = (config) => {
  return async (request, actionContext) => {
    const SubscriptionApi = _chunkPX5U6SIGcjs.extractDependency.call(void 0, "SubscriptionApi", config);
    const account = _optionalChain([request, 'access', _ => _.sessionData, 'optionalAccess', _2 => _2.account]);
    if (!account) {
      throw new Error("Not logged in.");
    }
    const subscriptionApi = new SubscriptionApi(
      actionContext.frontasticContext,
      _chunkTLTXMAELcjs.getLocale.call(void 0, request),
      _chunkTLTXMAELcjs.getCurrency.call(void 0, request)
    );
    const subscriptions = await subscriptionApi.getSubscriptionsForAccount(account.accountId);
    return {
      statusCode: 200,
      body: JSON.stringify(subscriptions),
      sessionData: request.sessionData
    };
  };
};



exports.getAllSubscriptions = getAllSubscriptions;
