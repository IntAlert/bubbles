const dotenv = require('dotenv').config();

var config = {
  "username": process.env.RDS_USERNAME,
  "password": process.env.RDS_PASSWORD,
  "database": process.env.RDS_DB_NAME,
  "host": process.env.RDS_HOSTNAME,
  "dialect": "mysql"
}

console.log('Using the following database credentials');
console.dir(config)

module.exports = config;
