"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  if (process.env.NODE_ENV === "test") {
    // For test environment, use a separate database (e.g., "pokegotchi_test")
    return "postgresql://postgres:password@localhost:5432/pokegotchi_test";
  } else {
    // For production or development environment, use DATABASE_URL environment variable if available, or default to "pokegotchi"
    return process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/pokegotchi";
  }
}


// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Pokegotchi Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("-------------------------------------------------------------");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
