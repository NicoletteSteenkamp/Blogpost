import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ezekiel1!",
  database: "blogpost",
  connectionLimit: 30,
});