const express = require("express");
const router = express.Router();
const Form = require("../Models/JournalForm");    

router.post('/', async(req, res) => {
    const { name, message:text } = req.body;

    try{
        const formEntry = new Form({ name, message: text});
        const savedEntry = await formEntry.save();

        console.log("Saved Data: ", savedEntry);
        res.status(200).json({ message: "form submitted successfully", data: savedEntry});
    } catch (error) {
        console.error("error saving form data: ", error);
        res.status(500).json({ message: "error saving form data", error: error.message});
        // if (error.code === 11000){
        //     res.status(400).json({ message: "error"});
        // } else {
        //     res.status(400).json({ message: "error saving form data"});
        // }
    }
});

module.exports = router;    