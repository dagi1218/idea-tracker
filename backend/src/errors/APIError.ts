import { APPError } from './APPError.js';

export interface APIErrorOptions {
    message: string;
    status?: number;
    isPublic?: boolean;
    errors?: unknown[];
}

export class APIError extends APPError {
    public readonly status: number;
    public readonly isPublic: boolean;
    public readonly errors?: unknown[];

    constructor({
        message,
        status = 500,
        isPublic = false,
        errors,
    }: APIErrorOptions) {
        super(message);
        this.status = status;
        this.isPublic = isPublic;
        this.errors = errors;
    }
}