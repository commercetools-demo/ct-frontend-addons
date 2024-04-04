// src/utils/parseRequestBody.ts
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

export {
  parseRequestBody_default
};
