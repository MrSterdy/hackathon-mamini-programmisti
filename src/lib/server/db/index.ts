import Redis from "ioredis";

import { DB_URL } from "$env/static/private";

const db = new Redis(DB_URL);

export default db;
