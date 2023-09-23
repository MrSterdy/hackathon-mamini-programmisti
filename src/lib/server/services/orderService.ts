import db from "$lib/server/db";
import type { Order } from "$lib/types";
import { randomUUID } from "crypto";

const ordersHash = "orders";
const userOrdersHash = "userOrders";

export async function getUserOrders(username: string) {
    const orders = await db.hget(userOrdersHash, username);
    if (!orders) {
        return null;
    }

    const ids = JSON.parse(orders) as string[];

    const pipeline = db.pipeline();
    for (const id of ids) {
        pipeline.hget(ordersHash, id);
    }

    const result = await pipeline.exec();

    return result!.map(
        ([, rawValue]) => JSON.parse(rawValue as string) as Order
    );
}

export async function createOrder(order: Order) {
    order.id = randomUUID();

    const userOrders = JSON.parse(
        (await db.hget(userOrdersHash, order.username)) ?? "[]"
    ) as string[];

    userOrders.push(order.id);

    const pipeline = db.pipeline();

    pipeline.hset(ordersHash, order.id, JSON.stringify(order));
    pipeline.hset(userOrdersHash, order.username, JSON.stringify(userOrders));

    await pipeline.exec();
}
