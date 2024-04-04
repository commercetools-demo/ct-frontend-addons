"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/shared/utils/string-herlpers/index.ts
var StringHelpers = class {
};
/**
 * isNumeric tests a string and returns true when it's a decimal value
 */
StringHelpers.isNumeric = (val) => !isNaN(+val);
/**
 * capitaliseFirstLetter capitalises only the very first character of a string, leaving the
 * rest unedited
 */
StringHelpers.capitaliseFirstLetter = (val) => val.charAt(0).toUpperCase() + val.slice(1);



exports.StringHelpers = StringHelpers;
