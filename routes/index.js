const routes = require("express").Router();
const userController = require("../controller/userController");

routes.get("/", (req, res) => {
  res.send("Fei Fong Wong");
});

routes.get("/username", userController.getUsername);

routes.get("/user", userController.getUser);

module.exports = routes;
