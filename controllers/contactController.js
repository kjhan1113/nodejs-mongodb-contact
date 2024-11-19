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
const viewAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  //  res.send(allContacts);
  res.render("all_contact", { contacts: contacts });
});

// URL : /contacts
// Method : POST (Add Contact)
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.send("name, email and phone are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.redirect("/contacts");
});

// URL : /contacts/add
// Method : GET
const viewAddContact = (req, res) => {
  res.render("add_contact");
};

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
  viewAllContacts,
  createContact,
  viewAddContact,
  getContact,
  updateContact,
  deleteContact,
};
