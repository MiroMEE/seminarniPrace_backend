const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        slovicka:Array,
        name:String,
        gameMode:String
    }
);

const Model = mongoose.model("datas",schema);
module.exports = Model;