// Schema -> Collection -> Document
const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String},
    phone : {type: String, required: [true, "This is required field"]},
},
{
  timestamps : true
});

// Change schema to model for MongoDB
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
