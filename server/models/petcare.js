const mongoose = require('mongoose');

const PetcareSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true // This ensures uniqueness of the email field
    },
    password: String
});

const PetcareModel = mongoose.model("petcares", PetcareSchema);
module.exports = PetcareModel;
