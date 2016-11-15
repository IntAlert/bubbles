const dotenv = require('dotenv').config();

var config = {
  "username": process.env.RDS_USERNAME,
  "password": process.env.RDS_PASSWORD,
  "database": process.env.RDS_DB_NAME,
  "host": process.env.RDS_HOSTNAME,
  // "port": 443,
  "dialect": "mysql",
  // "dialectOptions": {
  // 	"SSL_VERIFY_SERVER_CERT": __dirname + '/../certs/amazon-rds-ca-cert.pem'
  // }
}

console.log('Using the following database credentials');
console.dir(config)

module.exports = config;
