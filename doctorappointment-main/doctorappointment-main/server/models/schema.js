const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true, // You can specify other validation rules if needed
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    doctorIds: {
        type: Array,
        // required: true
    },
    check: {
        type: Number,
    },
    time: {
        type: String,
        required: true,
    },
    // Add other fields as needed
});
const LoginSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true, // Set the 'unique' property to true
        required: true, // You might want to make it required as well
    },
    password: String,
    contact: String,
    role: String,
    dob: String,
    gender: String,
    address: String,
    verified: Boolean,
    verificationToken: {
        type: String,
    },
});
const Appointment = mongoose.model("taskDetails", AppointmentSchema);
const User = mongoose.model("loginDetails", LoginSchema);
module.exports = { Appointment, User };
