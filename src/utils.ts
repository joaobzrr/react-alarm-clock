export function isFunction(obj: any): boolean {
    return obj && Object.prototype.toString.call(obj) === '[object Function]';
}

export function isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object String]";
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}
