const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("./helpers/uuid");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});
app.post("/api/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newToDo = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedReviews = JSON.parse(data);

        // Add a new review
        parsedReviews.push(newToDo);

        // Write updated reviews back to the file
        fs.writeFile(
          "db.json",
          JSON.stringify(parsedReviews, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated ToDos!")
        );
      }
    });

    const response = {
      status: "success",
      body: newToDo,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting ToDo");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  var id = req.params.id;

  const { title, text } = req.body;

  var parsedReviews = [];

  if (id) {
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        parsedReviews = JSON.parse(data);

        // var index = parsedReviews.indexOf(id);
        var index = parsedReviews.findIndex((x) => x.id === id);
        if (index > -1) {
          // only splice array when item is found
          parsedReviews.splice(index, 1); // 2nd parameter means remove one item only
        }
        // Write updated reviews back to the file
        fs.writeFile(
          "db.json",
          JSON.stringify(parsedReviews, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated ToDos!")
        );
      }
    });

    const response = {
      status: "success",
      body: parsedReviews,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting ToDo");
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
