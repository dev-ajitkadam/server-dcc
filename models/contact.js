const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number:String,
    cname: String,
    subject: String
});

const ContactModel = mongoose.model("contact", ContactSchema);

module.exports = ContactModel;
