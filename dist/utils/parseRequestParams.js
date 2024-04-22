var parseQueryParams = function (query) {
    var queryParams = {};
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            queryParams[key] = query[key];
        }
    }
    return queryParams;
};
export default parseQueryParams;
