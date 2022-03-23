const express = require("express");
const app = express();
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "../..", "dist")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../..", "index.html"))
);
app.use(express.static(path.join(__dirname, "../..", "public")));
app.use(express.json());

app.use("/api", require("./goodiebag"));

module.exports = app;
