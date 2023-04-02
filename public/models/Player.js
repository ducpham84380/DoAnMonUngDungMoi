const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
    NamePlayer: String,
    ID:String,
    Point:String,
});

module.exports = mongoose.model("Player", playerSchema);