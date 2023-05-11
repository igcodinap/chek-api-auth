import mysql from 'mysql2/promise';

const dbConfig = {
  host: !process.env.CLOUD_SQL_CONNECTION_NAME ? process.env.DB_HOST : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: !process.env.CLOUD_SQL_CONNECTION_NAME ? Number(process.env.DB_PORT) : undefined,
  waitForConnections: true,
  connectionLimit: 5,
  socketPath: process.env.CLOUD_SQL_CONNECTION_NAME
};

console.log(dbConfig, 'dbConfig');

export const pool = mysql.createPool(dbConfig);