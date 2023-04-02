const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    Token: String,
    IDToken: mongoose.SchemaTypes.ObjectId,
    RegisterDate: Date,
    State: Boolean
});

module.exports = mongoose.model("Token", tokenSchema);