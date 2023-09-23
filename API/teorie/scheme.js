const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name:String,
        teorie_json:String
    }
);

const Model = mongoose.model("Teorie",schema);
module.exports = Model;