const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const uri = 'mongodb+srv://mirdajakes:CMMMkklSX9iczMeH@seminarniprace-app-web.gjqizxi.mongodb.net/'
const params = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}

app.use(express.json());
app.use(cors());

require('./API/slovicka/slovicka')(app);
require('./API/users/users')(app);
require('./API/datas/datas')(app);

async function connect(){
    try{
        await mongoose.connect(uri,params);
        console.log("Connected to MongoDb");
    } catch (error){
        console.error(error);
    }
}
connect();

app.listen(3000, () =>{
    console.log("Node API app is running on port 3000");
});