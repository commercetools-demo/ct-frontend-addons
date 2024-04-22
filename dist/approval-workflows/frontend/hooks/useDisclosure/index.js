import { useCallback, useState } from 'react';
var useDisclosure = function (_a) {
    var _b = _a === void 0 ? {} : _a, openDelay = _b.openDelay, closeDelay = _b.closeDelay, _c = _b.defaultIsOpen, defaultIsOpen = _c === void 0 ? false : _c;
    var _d = useState(defaultIsOpen), isOpen = _d[0], setIsOpen = _d[1];
    var onOpen = useCallback(function () {
        if (openDelay)
            setTimeout(function () { return setIsOpen(true); }, openDelay);
        else
            setIsOpen(true);
    }, [openDelay]);
    var onClose = useCallback(function () {
        if (closeDelay)
            setTimeout(function () { return setIsOpen(false); }, closeDelay);
        else
            setIsOpen(false);
    }, [closeDelay]);
    var onToggle = useCallback(function () {
        if (isOpen)
            onClose();
        else
            onOpen();
    }, [onOpen, onClose, isOpen]);
    return { isOpen: isOpen, onOpen: onOpen, onClose: onClose, onToggle: onToggle };
};
export default useDisclosure;
