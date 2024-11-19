const express = require("express");
const router = express.Router();
const { viewAllContacts, createContact, getContact, updateContact, deleteContact, viewAddContact } = require("../controllers/contactController");

router.route("/").get(viewAllContacts);

router.route("/viewAddContact").get(viewAddContact).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
