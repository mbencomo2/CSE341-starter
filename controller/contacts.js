const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const searchParam = req.params.id;
  const o_id = new ObjectId(searchParam);
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({_id: o_id});
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
