export type UserEntity = {
    username: string;

    role: "ADMIN" | "ORGANIZER" | "USER";

    passwordHash: string;
}