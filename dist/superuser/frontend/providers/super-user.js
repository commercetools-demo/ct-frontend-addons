import React, { createContext, useContext, useState } from 'react';
var initialState = {
    superUserData: undefined,
    setSuperUser: function () { },
};
var SuperUserContext = createContext(initialState);
export var SuperUserProvider = function (_a) {
    var children = _a.children, initialSuperUserData = _a.initialSuperUserData;
    var _b = useState(initialSuperUserData), superUserData = _b[0], setSuperUser = _b[1];
    return (React.createElement(SuperUserContext.Provider, { value: {
            setSuperUser: setSuperUser,
            superUserData: superUserData,
        } }, children));
};
export var useSuperUserContext = function () { return useContext(SuperUserContext); };
