const serverEnvironment = {
  baseUrl: process.env.BASE_URL,
  jsonWebTokenSecret: process.env.JSON_WEB_TOKEN_SECRET,
  isProduction: process.env.NODE_ENV === "production",
  dbUrl: process.env.DB_STRING_URL
};

module.exports = exports = serverEnvironment;
