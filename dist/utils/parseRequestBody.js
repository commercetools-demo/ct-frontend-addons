var parseRequestBody = function (body) {
    try {
        if (!body) {
            return null;
        }
        return JSON.parse(body);
    }
    catch (error) {
        console.error('Error parsing request body', error);
        return null;
    }
};
export default parseRequestBody;
