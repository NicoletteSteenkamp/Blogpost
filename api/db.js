import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.AIVEN_HOST,
  user: process.env.AIVEN_USER,
  password: process.env.AIVEN_PASSWORD,
  database: process.env.AIVEN_DATABASE,
  port: process.env.AIVEN_PORT,
  connectTimeout: 60000,
  ssl: { rejectUnauthorized: false }  // Aiven typically requires SSL connections
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the Aiven database:', err.stack);
    return;
  }
  console.log('Connected to the Aiven MySQL database.');
});
