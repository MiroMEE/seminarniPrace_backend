const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

require('./API/slovicka/slovicka')(app);
require('./API/users/users')(app);
require('./API/teorie/teorie')(app);

mongoose
    .connect('mongodb://localhost/rj_database',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((err)=>{
        app.listen(3000, () =>{
            console.log("Node API app is running on port 3000");
    });
    }).catch((error)=>{
        console.log(error);
    });