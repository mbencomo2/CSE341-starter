const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res) => {
  // #swagger.summary = 'Grabs all contacts from the database'
  try {
    const result = await mongodb.getDb().db("test").collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getContact = async (req, res) => {
  // #swagger.summary = 'Grab a single contact by id'
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createContact = async (req, res) => {
/*    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Adding new contact.',
        schema: {
          $firstName: 'any',
          $lastName: 'any',
          $email: 'any',
          $birthday: 'any',
          $favoriteColor: 'any'
        }
      } 
      #swagger.summary = 'Create a new contact'
*/
  try {
    const body = req.body;
    const result = await mongodb.getDb().db("test").collection("contacts").insertOne(body);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateContact = async (req, res) => {
  /*    #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Updating a contact.',
          schema: {
            $firstName: 'any',
            $lastName: 'any',
            $email: 'any',
            $birthday: 'any',
            $favoriteColor: 'any'
          }
        }
        #swagger.summary = 'Make a change to an existing contact. This also creates a new contact if one does not exist.'
  */
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
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  // #swagger.summary = 'Delete a contact. Requires the contact's id'
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("test").collection("contacts").deleteOne({ _id: id });
    console.log({ action: "delete", deleted: result.deletedCount });
    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
