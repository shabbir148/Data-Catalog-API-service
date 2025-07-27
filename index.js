const express = require("express");
const app = express();
const port = 3000;
const db = require("./db.ts");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
