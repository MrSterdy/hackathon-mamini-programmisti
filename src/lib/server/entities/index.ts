export type UserEntity = {
    username: string;

    role: "ADMIN" | "USER";

    passwordHash: string;
}