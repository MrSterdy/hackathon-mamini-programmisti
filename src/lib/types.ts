import type { dishTypes } from "$lib/consts";

export type User = {
    username: string;

    role: "ADMIN" | "ORGANIZER" | "USER";
};

export type Dish = {
    id: string;

    name: string;
    description: string;

    type: keyof typeof dishTypes;
};
