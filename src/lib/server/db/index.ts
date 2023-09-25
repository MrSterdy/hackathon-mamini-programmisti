import { createClient } from "redis";

import { REDIS_PASSWORD, REDIS_URL } from "$env/static/private";

const db = createClient({ url: REDIS_URL, password: REDIS_PASSWORD });

export default db;
