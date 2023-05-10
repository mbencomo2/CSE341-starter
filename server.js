const express = require("express");
const app = express();
const mongoDB = require("./db/connect");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Content-Type", "application/json");
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
