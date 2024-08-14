const express = require("express");
const router = express.Router();
const ContactModel = require("../models/contact");

router.post("/addContact", async (req, res) => {
    try {
        const { name, email, number, cname, subject } = req.body;
        if (!name || !email || !number ) {
            return res.status(400).json({ status: "Bad Request", message: "All fields are required" });
        }
        await ContactModel.create({ name, email, number, cname, subject });
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err.message });
    }
});

router.get("/getContact", async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        res.send(contacts);
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err.message });
    }
});

router.delete("/deleteContact/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedContact = await ContactModel.findByIdAndDelete(id); 

        if (!deletedContact) {
            return res.status(404).json({ status: "Not Found", message: "Contact not found" });
        }

        res.json({ status: "Success", message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err.message });
    }
});

module.exports = router;
