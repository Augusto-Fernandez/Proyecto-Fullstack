export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> { //usa el generico T para que tome el tipado de val
    if (!val) { //asserts es una palabra reservada de typescript, le esta diciendo se fije que T no sea null
        throw Error("Expected 'val' to be defined, but received " + val);
    }
}