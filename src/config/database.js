require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    port: 5432,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_HOST,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    port: 5432,
    database: process.env.DB_TEST_DATABASE,
    host: process.env.DB_TEST_HOST,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
