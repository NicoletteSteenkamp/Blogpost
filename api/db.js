import mysql from "mysql2";

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ezekiel1!",
  database: "blogpost",
  connectionLimit: 30,
});

// Promisify the connection
export const dbPromise = db.promise();

