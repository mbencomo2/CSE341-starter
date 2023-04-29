const express = require("express");
const mongoDB = require("./db/connect");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Origin", "*");
    next();
  })
  .use("/", require("./routes/index"));

mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else if (mongoDB) {
    app.listen(port);
    console.log(`Server connected to DB and listening on port ${port}`);
  }
});
