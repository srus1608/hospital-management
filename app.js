const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'hospital_management'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database');
    createUsersTable();
    registerUser('john123', 'mypassword', 'patient');
  }
});

const createUsersTable = () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('patient', 'admin', 'doctor') NOT NULL
    )
  `;
  
  connection.query(createUsersTableQuery, (error) => {
    if (error) {
      console.error('Error creating users table: ', error);
    } else {
      console.log('Users table created successfully');
    }
  });
};

const registerUser = (username, password, role) => {
  const insertUserQuery = `
    INSERT INTO users (username, password, role)
    VALUES (?, ?, ?)
  `;
  
  connection.query(insertUserQuery, [username, password, role], (error, results) => {
    if (error) {
      console.error('Error registering user: ', error);
    } else {
      console.log('User registered successfully');
    }
  });
};





// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// });

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/views/login.html');
// });

// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/views/register.html');
// });

// app.get('/appointment', (req, res) => {
//     res.sendFile(__dirname + '/views/appointment.html');
// });

// app.get('/manage', (req, res) => {
//     res.sendFile(__dirname + '/views/manage.html');
// });

// app.get('/add-doctor', (req, res) => {
//     res.sendFile(__dirname + '/views/add_doctor.html');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
