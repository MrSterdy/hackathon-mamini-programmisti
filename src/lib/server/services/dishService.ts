import db from "$lib/server/db";
import type { Dish } from "$lib/types";

import { randomUUID } from "crypto";

const dishesHash = "dishes";

export async function getAllDishes() {
    const result = await db.hgetall(dishesHash);

    return Object.values(result).map(rawValue => JSON.parse(rawValue) as Dish);
}

export async function createDish(dish: Dish) {
    dish.id = randomUUID();

    await db.hset(dishesHash, dish.id, JSON.stringify(dish));
}

export async function deleteDish(id: string) {
    await db.hdel(dishesHash, id);
}

export async function updateDish(dish: Dish) {
    await db.hset(dishesHash, dish.id, JSON.stringify(dish));
}
