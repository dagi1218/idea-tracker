export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
} as const;


export type Role = (typeof ROLES)[keyof typeof ROLES];


export const MODEL_NAMES = {
    USER: 'User',
    IDEA: 'Idea',
} as const;

export const REGEX = {
    // At least 8 characters: 1 uppercase, 1 lowercase, 1 number, 1 special character
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};