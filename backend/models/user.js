const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    nickname: { type: String, required: true },
    rol: {type: String, required: true}
});

module.exports = userSchema;