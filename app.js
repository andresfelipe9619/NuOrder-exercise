const {
    hasKey,
    isArray,
    isObject,
    isUndefined,
    isNonComplexType,
    isNullOrUndefined,
} = require("./utils");

const recursiveMerge = (target, source) => {
    const canMerge = isObject(target) && isObject(source)
    if (!canMerge) throw new TypeError("Please provide two valid objects!");
    const fields = [...new Set([...Object.keys(target), ...Object.keys(source)])];
    console.log('fields', fields)
    return fieldsReducer({ target, source, fields });
}

const fieldsReducer = ({ target, source, fields }) => fields.reduce((mergedObject, field) => {
    let targetHasKey = hasKey(target, field);
    let sourceHasKey = hasKey(source, field);
    let isTargetKeyArray = isArray(target[field]);
    let isSourceKeyArray = isArray(source[field]);

    // if a[field] and b[field] are objects, make recursion
    if (isObject(target[field]) && isObject(source[field])) {
        return {
            ...mergedObject, [field]: recursiveMerge(target[field], source[field])
        }
    }
    // If a[field] is an array an b[field] exists but is undefined or null, set a[field] to an empty array
    if (isTargetKeyArray && isNullOrUndefined(source[field])) {
        return {
            ...mergedObject,
            [field]: []
        }
    }
    // If a[field] is an array, and b[field] is defined and is not an array, add b[field] to the array
    if (isTargetKeyArray && !isArray(source[field])) {
        return {
            ...mergedObject,
            [field]: [...target[field], source[field]]
        }
    }
    // If a[filed] is an array and b[field] is an array, set a[field] to b[field]
    if (isTargetKeyArray && isSourceKeyArray) {
        return {
            ...mergedObject,
            [field]: source[field]
        }
    }
    // If a[field] exists and b[field] exists but is undefined, delete a[field]
    if (targetHasKey && sourceHasKey && isUndefined(source[field])) {
        return mergedObject;
    }
    // If b[field] is a non-complex type (number, string, boolean, et cetera), copy to a[field]
    if (sourceHasKey && isNonComplexType(source[field])) {
        return {
            ...mergedObject,
            [field]: source[field]
        }
    }

    // If nothing is copied from b to a, use default field
    if (targetHasKey) {
        return { ...mergedObject, [field]: target[field] };
    }

    return mergedObject;

}, {});

exports.default = recursiveMerge