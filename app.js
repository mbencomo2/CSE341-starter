const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Fei Fong Wong");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mongodb = require('./connections/mongodb.cjs');
mongodb.run();