const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection Configuration
// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', 
    port: 3306,
    user: 'root', 
    password: 'Ezekiel1!',
    database: 'blogpost'
  });
  

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define routes
// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
