const controller = require("../controller/users");
const express = require("express");
const router = express();

router.get("/", controller.getUser);
router.get("/username/:id", controller.getUsername);

module.exports = router;