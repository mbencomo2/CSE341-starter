const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res) => {
  const result = await mongodb.getDb().db("test").collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const searchParam = req.params.id;
  const o_id = new ObjectId(searchParam);
  const result = await mongodb.getDb().db("test").collection("contacts").find({ _id: o_id });
  result.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    if (list.length == 0) {
      res.status(200).json({ message: `No match for ${searchParam}` });
    } else {
      res.status(200).json(list);
    }
  });
};

const createContact = async (req, res) => {
  try {
    const body = req.body;
    const result = await mongodb.getDb().db("test").collection("contacts").insertOne(body);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const body = req.body;
    const result = await mongodb
      .getDb()
      .db("test")
      .collection("contacts")
      .updateOne({ _id: id }, { $set: body }, { upsert: true });
    if (result.acknowledged) {
      res.status(204);
      console.log({
        action: "update",
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("test").collection("contacts").deleteOne({ _id: id });
    console.log({ action: "delete", deleted: result.deletedCount });
    res.status(204);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
