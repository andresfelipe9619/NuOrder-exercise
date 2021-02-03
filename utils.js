const isArray = x => x && Array.isArray(x);
const isObject = x => x && typeof x === 'object' && !isArray(x);
const isUndefined = x => typeof x === "undefined";
const isNull = x => x === null;
const isNullOrUndefined = x => isNull(x) || isUndefined(x);
const isNonComplexType = x => !isArray(x) && !isObject(x);
const hasKey = (x, key) => key in x;

module.exports = {
    hasKey,
    isNull,
    isArray,
    isObject,
    isUndefined,
    isNonComplexType,
    isNullOrUndefined,
}