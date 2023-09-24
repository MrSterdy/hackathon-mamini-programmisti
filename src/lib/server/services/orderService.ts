import db from "$lib/server/db";
import type { Order } from "$lib/types";
import { randomUUID } from "crypto";

const ordersHash = "orders";
const userOrdersHash = "userOrders";

export async function getUserOrders(username: string) {
    const orders = await db.HGET(userOrdersHash, username);
    if (!orders) {
        return null;
    }

    const ids = JSON.parse(orders) as string[];

    const transaction = db.multi();
    for (const id of ids) {
        transaction.HGET(ordersHash, id);
    }

    const result = await transaction.exec();

    return result!.map(value => JSON.parse(value as string) as Order);
}

export async function createOrder(order: Order) {
    order.id = randomUUID();

    const userOrders = JSON.parse(
        (await db.HGET(userOrdersHash, order.username)) ?? "[]"
    ) as string[];

    userOrders.push(order.id);

    const transaction = db.multi();

    transaction.HSET(ordersHash, order.id, JSON.stringify(order));
    transaction.HSET(userOrdersHash, order.username, JSON.stringify(userOrders));

    await transaction.exec();
}
