import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.AIVEN_HOST,
  user: process.env.AIVEN_USER,
  password: process.env.AIVEN_PASSWORD,
  database: process.env.AIVEN_DATABASE,
  port: process.env.AIVEN_PORT,
  ssl: { rejectUnauthorized: false }  // Aiven typically requires SSL connections
});

// Define the pingDatabase function
function pingDatabase() {
  db.query('SELECT 1', (err) => {
    if (err) {
      console.error('Error pinging the database:', err.stack);
    } else {
      console.log('Database connection is active.');
    }
  });
}

// Connect to the database initially
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
  
  // Initial ping
  pingDatabase();
  
  // Set up interval to ping the database every 2 days
  setInterval(pingDatabase, 1000 * 60 * 60 * 24 * 2);
});

export { db };
