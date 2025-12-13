export type ActionState = {
    message: string;
    errors?: Record<string, string[]>;
    success?: boolean;
};
