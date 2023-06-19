import pg from 'pg';
const { Pool } = pg;

const config = {
    host: 'localhost',
    port: 5432,
    database: 'db_bootcamp',
    user: 'postgres',
    password: '123456',
};

const db = new Pool(config)

export default db