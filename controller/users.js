const mongodb = require("../db/connect");

const getUser = async (req, res) => {
  const result = await mongodb.getDb().db().collection("users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(lists);
  });
};

const getUsername = async (req, res) => {
  const result = await mongodb.getDb().db().collection("users").find();
  result.toArray().then((lists) => {
    const searchParam = req.params.id;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(lists[searchParam].username);
  });
};

module.exports = { getUser, getUsername };
