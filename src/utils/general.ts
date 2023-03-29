export const asArr = Object.values;

export function isStr (d: any) {
    return typeof d === 'string';
}

export function spaceship (a: any, b: any) {
    if (isStr(a) && isStr(b)) {
        return String(a).localeCompare(String(b));
    } else if (typeof a !== typeof b) {
        return String(a).localeCompare(String(b));
    }

    return a > b ? 1 : a < b ? -1 : 0;
}
