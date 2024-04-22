export var getOffsetFromCursor = function (cursor) {
    if (cursor === undefined) {
        return undefined;
    }
    var offsetMach = cursor.match(/(?<=offset:).+/);
    return offsetMach !== null ? +Object.values(offsetMach)[0] : undefined;
};
