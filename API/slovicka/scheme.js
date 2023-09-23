const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name:String,
        slovicka_json:String
    }
);

const Model = mongoose.model("Slovicka",schema);
module.exports = Model;