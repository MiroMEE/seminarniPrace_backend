const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
// Email 1/2
const emailRegExp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
const isEmail = (email)=>{
    if(emailRegExp.test(email)) return true;
    return false;
}
// Hlavni
const schema = mongoose.Schema(
    {
        name:{
            type:String,
            validate:{
                validator:validateName
            },
            required: [true,'Jméno je povinné!']
        },
        email:{
            type:String,
            validate:{
                validator:validateEmail,
            },
            required: [true, 'Email je povinný!']
        },
        password:{
            type:String,
            required:[true, "Heslo je povinné!"]
        }
    }
);
// Password - pre!
schema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next();
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next()
        })
    });
});
// Email 2/2
async function validateEmail(email){
    if(!isEmail(email)) throw new Error('Email je v špatné formě!');
    const user = await this.constructor.findOne({email});
    if(user) throw new Error('Email už existuje!');
}
//Username
async function validateName(name){
    const user = await this.constructor.findOne({name});
    if(user) throw new Error('Jméno už existuje!');
}

//Konec
const Model = mongoose.model("Users",schema);
module.exports = Model;