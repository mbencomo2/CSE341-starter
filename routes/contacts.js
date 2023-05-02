const controller = require("../controller/contacts");
const express = require("express");
const router = express();

router.use("/", (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", controller.getContacts);
//Get a contact
router.get("/:id", controller.getContact);
//Create a contact
router.post("/", controller.createContact);
//Update a contact
router.put("/:id", controller.updateContact);
//delete a contact
router.delete("/:id", controller.deleteContact);

module.exports = router;
