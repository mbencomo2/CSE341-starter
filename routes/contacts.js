const controller = require("../controller/contacts");
const express = require("express");
const router = express();

router
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Content-Type", "application/json");
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
