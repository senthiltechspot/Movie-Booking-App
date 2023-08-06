require("dotenv").config();

module.exports = {
  DB_NAME: "mba_db",
  DB_URL: process.env.MONGODB_URI,
};
