const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'leo',
    password: 'admin123',
    database: 'bgstudio-db',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
