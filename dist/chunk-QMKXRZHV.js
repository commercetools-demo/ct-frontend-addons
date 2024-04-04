// src/utils/parseRequestParams.ts
var parseQueryParams = (query) => {
  const queryParams = {};
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryParams[key] = query[key];
    }
  }
  return queryParams;
};
var parseRequestParams_default = parseQueryParams;

export {
  parseRequestParams_default
};
