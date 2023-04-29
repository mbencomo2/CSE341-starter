const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("Fei Fong Wong");
});

router.use("/contacts", require("./contacts"));
router.use("/users", require("./users"));

module.exports = router;
