import mysql from "mysql2";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ezekiel1!",
  database: "blogpost",
  connectionLimit: 30,
});

export const db = pool.promise();
