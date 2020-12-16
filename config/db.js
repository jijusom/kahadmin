const pg = require('pg');
const { Pool } = require('pg');

if (process.env.DATABASE_URL) {
    pg.defaults.ssl = true;
  
  }
  console.log(process.env.DATABASE_URL );
  let connString = process.env.DATABASE_URL || 'postgresql://dbkah:admin123@@localhost/dbkah';
  logging: false

  const pool = new Pool({
    connectionString : connString,
    ssl: process.env.DATABASE_URL ? true : false
  });
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
process.env.TZ = 'Asia/Calcutta'
  module.exports = {connString};