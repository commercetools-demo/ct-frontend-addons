import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useSuperuserContext } from '../../provider';
var ReassignCartButton = function (_a) {
    var _b, _c;
    var activeBusinessUnit = _a.activeBusinessUnit, className = _a.className, accountId = _a.accountId, cartAccountId = _a.cartAccountId, Dropdown = _a.Dropdown, translate = _a.translate, reassignCart = _a.reassignCart;
    var superuserStatus = useSuperuserContext().superuserStatus;
    if (!(superuserStatus === null || superuserStatus === void 0 ? void 0 : superuserStatus.isSuperuser) || ((_b = activeBusinessUnit === null || activeBusinessUnit === void 0 ? void 0 : activeBusinessUnit.associates) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        return null;
    }
    return (React.createElement(Dropdown, { onChange: function (associate) { return reassignCart(associate === null || associate === void 0 ? void 0 : associate.accountId, associate === null || associate === void 0 ? void 0 : associate.email); }, className: className },
        React.createElement(Dropdown.Button, null, translate('cart.superuser.reassign.cart')),
        React.createElement(Dropdown.Options, null, (_c = activeBusinessUnit === null || activeBusinessUnit === void 0 ? void 0 : activeBusinessUnit.associates) === null || _c === void 0 ? void 0 : _c.filter(function (associate) { return associate.accountId !== accountId; }).map(function (associate) {
            var _a;
            return (React.createElement(Dropdown.Option, { key: associate.accountId, value: associate }, "".concat(associate.firstName || '', " ").concat(associate.lastName || '', " ").concat(((_a = associate.roles) === null || _a === void 0 ? void 0 : _a.length) && " (".concat(associate.roles.map(function (role) { return role.key; }).join(', '), ")")),
                cartAccountId === associate.accountId && React.createElement(CheckIcon, { className: "ml-2 inline h-4 w-4" })));
        }))));
};
export default ReassignCartButton;
