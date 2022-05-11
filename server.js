const express = require("express");
const path = require("path");
const fs = require("fs");

const { notex }= require("./db/db.json");
const PORT = 4000;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));

function createNewNote(body, noteArray) {
  const writtenNote = body;
  noteArray.push(writtenNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notex: noteArray }, null, 2)
  );
  return writtenNote;
}

app.get("/api/notes", (req, res) => {
  let results = notex;

  res.json(results);
});

app.post("/api/notes", (req, res) => {
  // req.body is where our incoming content will be
  const notexs = createNewNote(req.body, notex);

  res.json(notexs);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`you are listening on ${PORT}`);
});
