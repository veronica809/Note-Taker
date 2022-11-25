const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("index.html");
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  // Send a message to the client
  res.sendFile(path.join(__dirname, "db.json"));

  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
