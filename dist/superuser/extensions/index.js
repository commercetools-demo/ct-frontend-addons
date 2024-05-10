import { getSuperuser, loginCSR, loginHookWithCSRCheck, logoutWithCSRCheck } from './actionControllers/AccountController';
import { changePrice, checkoutWithCSR, getOrders } from './actionControllers/CartController';
var superuser = {
    actions: [
        {
            action: 'login',
            actionNamespace: 'account',
            hook: loginHookWithCSRCheck,
        },
        {
            action: 'logout',
            actionNamespace: 'account',
            hook: logoutWithCSRCheck,
        },
        {
            action: 'loginCSR',
            actionNamespace: 'account',
            hook: loginCSR,
            create: true,
        },
        {
            action: 'checkout',
            actionNamespace: 'cart',
            hook: checkoutWithCSR,
        },
        {
            action: 'getOrders',
            actionNamespace: 'cart',
            hook: getOrders,
        },
        {
            action: 'changePrice',
            actionNamespace: 'cart',
            hook: changePrice,
            create: true,
        },
        {
            action: 'getSuperuser',
            actionNamespace: 'account',
            hook: getSuperuser,
            create: true,
        },
    ],
};
export default superuser;
