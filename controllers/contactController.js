const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

/*
  EJS Template
  <%= variable %> : <%= heading %>
  <% Javascript %> : <% console.log() %>
  <%- HTML Code %> : <%- include('include/header') %>
*/

// URL : /contacts
// Method : GET
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  //  res.send(allContacts);
  console.log(contacts);
  res.render("all_contact", { contacts: contacts });
});

// URL : /contacts
// Method : POST
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.send("name, email and phone are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.send("Contact is created");
});

// URL : /contacts/:id
// Method : GET
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.send(contact);
});

// URL : /contacts/:id
// Method : PUT
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error("Contact not found.");
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  contact.save();
  res.send(`${id} is updated`);
});

// URL : /contacts/:id
// Method : DELETE
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error("Contact not found.");
  }
  await Contact.deleteOne();
  res.send(`${id} is deleted`);
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
