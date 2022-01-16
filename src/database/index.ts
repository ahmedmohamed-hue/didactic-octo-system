import { Pool, PoolConfig } from "pg"

const config: PoolConfig = {
    user: "ahmed",
    host: "localhost",
    database: "test",
    password: "1798",
    port: 5432,
}

const db = new Pool(config)

export default db
