const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name:String,
        slovicka:Array,
        gameMode:String,
        hosted:String,
        players:Array
    }
);

const Model = mongoose.model("datas",schema);
module.exports = Model;