import db from "$lib/server/db";
import type { Dish } from "$lib/types";

import { randomUUID } from "crypto";

const dishesHash = "dishes";

export async function getAllDishes() {
    const result = await db.HGETALL(dishesHash);

    return Object.values(result).map(rawValue => JSON.parse(rawValue) as Dish);
}

export async function getDishById(id: string) {
    const result = await db.HGET(dishesHash, id);

    return result ? JSON.parse(result) as Dish : null;
}

export async function createDish(dish: Dish) {
    dish.id = randomUUID();

    await db.HSET(dishesHash, dish.id, JSON.stringify(dish));
}

export async function deleteDish(id: string) {
    await db.HDEL(dishesHash, id);
}

export async function updateDish(dish: Dish) {
    await db.HSET(dishesHash, dish.id, JSON.stringify(dish));
}
