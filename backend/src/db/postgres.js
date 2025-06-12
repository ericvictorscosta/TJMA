const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TJMA DB',
  password: 'kayo@2024',
  port: 5432,
});

module.exports = pool;
