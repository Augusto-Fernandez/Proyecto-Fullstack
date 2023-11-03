class HttpError extends Error { //usa una clase porque Error es una clase y necesita heredar de ahí
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError { }

/**
 * Status code: 409
 */
export class ConflictError extends HttpError { }

// Add more error classes if you need distinction