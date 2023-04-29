const controller = require("../controller/contacts");
const express = require("express");
const router = express();

router.use("/", (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", controller.getContacts);
router.get("/:id", controller.getContact);

module.exports = router;
