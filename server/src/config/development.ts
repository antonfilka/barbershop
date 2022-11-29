const pathDevelopment = require('path');
require('dotenv').config({ path: pathDevelopment.resolve('.env') });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    CLIENT_URL: 'http://localhost:3001',
    SERVER_URL: 'http://localhost:3000',
  },
};
