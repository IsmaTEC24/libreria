const express = require("express");

const userRoutes = require("./src/routes/userRoutes");
const readingProgressRoutes = require("./src/routes/readingProgressRoutes");
const favoriteRoutes = require("./src/routes/favoriteRoutes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) =>
  res.json({ status: "OK", service: "MS2-NodeJS" })
);

app.use("/users", userRoutes);
app.use("/reading-progress", readingProgressRoutes);
app.use("/favorites", favoriteRoutes);

module.exports = app;
