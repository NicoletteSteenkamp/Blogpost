import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_KEY,
  database: 'blogpost',
  connectTimeout: 30000
});

db.connect();

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});
