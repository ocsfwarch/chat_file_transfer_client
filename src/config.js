require("dotenv").config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  API_URL: process.env.API_URL || "http://localhost:5007/files",
  API_TOKEN: process.env.API_TOKEN || "bcabc50c-76f4-11ea-bc55-0242ac130003",
};
