const routes = require("express").Router();
const userController = require("../controller/userController");
const contactsController = require("../controller/contactsController");

routes.get("/", (req, res) => {
  res.send("Fei Fong Wong");
});

// Routes for users
routes.get("/username", userController.getUsername);
routes.get("/user", userController.getUser);

// Routes for contacts
routes.get("/contacts", contactsController.getContacts);
routes.get("/contact", contactsController.getContact);

module.exports = routes;
