var StringHelpers = /** @class */ (function () {
    function StringHelpers() {
    }
    /**
     * isNumeric tests a string and returns true when it's a decimal value
     */
    StringHelpers.isNumeric = function (val) { return !isNaN(+val); };
    /**
     * capitaliseFirstLetter capitalises only the very first character of a string, leaving the
     * rest unedited
     */
    StringHelpers.capitaliseFirstLetter = function (val) { return val.charAt(0).toUpperCase() + val.slice(1); };
    return StringHelpers;
}());
export { StringHelpers };
