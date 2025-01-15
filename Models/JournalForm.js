const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
});

// const JournalForm = mongoose.model("JournalForm", FormSchema);
// module.exports = JournalForm;

module.exports = mongoose.model("Form", FormSchema);