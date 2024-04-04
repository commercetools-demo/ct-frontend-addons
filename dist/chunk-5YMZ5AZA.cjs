"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/utils/parseRequestBody.ts
var parseRequestBody = (body) => {
  try {
    if (!body) {
      return null;
    }
    return JSON.parse(body);
  } catch (error) {
    console.error("Error parsing request body", error);
    return null;
  }
};
var parseRequestBody_default = parseRequestBody;



exports.parseRequestBody_default = parseRequestBody_default;
