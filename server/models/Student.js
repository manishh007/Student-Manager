const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    address: String,
    dob: Date,
    phone: String,
    feesPaid: Boolean
});

module.exports = mongoose.model("Student", studentSchema);