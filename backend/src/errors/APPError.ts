export class APPError extends Error {
    public readonly name: string;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

}