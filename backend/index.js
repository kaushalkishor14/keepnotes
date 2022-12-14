const connectionToMongo = require("./db");
const express = require("express");

connectionToMongo();
const app = express();
const port = 5000;

app.use(express.json());
//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
