var config;

if(false && process.env.NODE_ENV == 'development') {

  console.log('Using development database');

  config = {
    "username": "root",
    "password": null,
    "database": "bubbles",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

} else {
  // assume we are on RDS
  config = {
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME,
    "host": process.env.RDS_HOSTNAME,
    "dialect": "mysql"
  }
}

module.exports = config;


// {
//   "local": {
//     "username": "root",
//     "password": null,
//     "database": "bubbles",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "development": {
//     "username": "bubbles",
//     "password": "oneB23VYGBYVzc",
//     "database": "bubbles",
//     "host": "bubbles.c3vcgdaryr9n.eu-west-1.rds.amazonaws.com",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
