const mysql = require("mysql");
require("dotenv").config();

const MYSQLUSER = process.env.MYSQLUSER;
const MYSQLPASSWORD = process.env.MYSQLPASSWORD;
const MYSQLHOST = process.env.MYSQLHOST;
const MYSQLPORT = process.env.MYSQLPORT;
const MYSQLDATABASE = process.env.MYSQLDATABASE;

const urlDB = `mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`;

const connection = mysql.createConnection(urlDB);

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log(`Connection is established`);
});

let db = {};

// Request to the authTable

db.getAllUser = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM authTable", (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users);
    });
  });
};

db.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM authTable WHERE email=?",
      [email],
      (error, users) => {
        if (error) {
          return reject(error);
        }
        return resolve(users[0]);
      }
    );
  });
};

db.insertUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO authTable (username , email ,password) VALUES (? , ? , ?) ",
      [username, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.updateUser = (id, username, email, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE authTable SET username = ? , email = ? , password = ? WHERE id = ?",
      [username, email, password, id],
      (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

db.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE * FROM authTable WHERE id = ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(console.log("User deleted"));
    });
  });
};

module.exports = db;
