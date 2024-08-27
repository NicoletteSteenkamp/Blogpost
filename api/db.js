import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
  host: 'Nicolette',
  user: 'root',
  password: process.env.DB_KEY,
  database: 'blogpost'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});
