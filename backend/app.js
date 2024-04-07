"use strict";

/** Express app for pokegotchi. */

const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const petRoutes = require("./routes/userPets");
const pokePetRoutes = require("./routes/pokePets");
const interactionRoutes = require("./routes/interactions");
const swaggerDocs = require('./swagger.js');

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/pokePets", pokePetRoutes);
app.use("/interactions", interactionRoutes);


//404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

//Error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
