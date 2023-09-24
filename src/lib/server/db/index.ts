import { createClient } from "redis";

import { DB_URL } from "$env/static/private";

const db = createClient({ url: DB_URL });

export default db;
