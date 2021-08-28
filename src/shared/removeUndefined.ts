export function removeUndefinedMutable<T>(obj: T) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    });
}

export function removeUndefined<T>(obj: T) {
    return Object.keys(obj).reduce((newObj, key) => {
            if (obj[key] === undefined) {
                return {...newObj, [key]: obj[key]};
            }
            return newObj;
        },
        {}
    );
}

export function filterUndefined<T>(el: T | undefined): el is T {
    return el !== undefined;
}