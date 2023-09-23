import type { dishTypes, holidayTypes } from "$lib/consts";

export type User = {
    username: string;

    role: "ADMIN" | "ORGANIZER" | "USER";
};

export type Dish = {
    id: string;

    name: string;

    type: keyof typeof dishTypes;
};

export type Order = {
    id: string;

    username: string;

    holidayType: keyof typeof holidayTypes;

    people: number;

    budget: number;

    date: string;

    dishes: string[];
}

export type DetailedOrder = Omit<Order, "dishes"> & { dishes: Dish[] };
