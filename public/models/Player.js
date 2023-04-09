const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
    NamePlayer: String,
    ID: String,
    Password:  String,
    Point: String,
    Active: Boolean,
    RegisterDate: Date,
});

module.exports = mongoose.model("Player", playerSchema);
// table player