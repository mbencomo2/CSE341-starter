const mongodb = require("../db/connect");

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.status(200).json(lists);
  });
};

const getContact = async (req, res, next) => {
  const searchParam = req.query.firstName;
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({ firstName: { $eq: searchParam } });
  result.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Controll-Allow-Origin", "*");
    if (list.length == 0) {
      res.status(200).json({ message: `No match for ${searchParam}` });
    } else {
      res.status(200).json(list);
    }
  });
};

module.exports = { getContacts, getContact };
