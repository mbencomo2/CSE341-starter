const express = require("express");
const mongoDB = require("./db/connect");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", require("./routes/index"));

mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else if (mongoDB) {
    app.listen(port);
    console.log(`Server connected to DB and listening on port ${port}`);
  }
});
