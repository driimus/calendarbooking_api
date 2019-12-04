module.exports = {
  development: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'cwcalendar',
    password: process.env.DB_PASSWORD || 'verysecurepassword',
    port: process.env.DB_PORT,
  },
  production: {
    user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  },
  test: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'cwcalendartest',
    password: process.env.DB_PASSWORD || 'verysecurepassword',
  },
};
