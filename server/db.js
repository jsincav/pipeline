const { Client } = require('pg')

const client = new Client({
    user: 'jsincav',
    host: 'aa19ug1kkilw6wr.cjteozglkv4t.us-east-1.rds.amazonaws.com',
    database: 'ebdb',
    password: 'dbpassword',
    port: 5432,
  })

client.connect();

module.exports = {client};