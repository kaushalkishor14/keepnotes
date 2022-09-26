const connectionToMongo = require("./db");
const express = require("express");

connectionToMongo();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Kaushal");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
