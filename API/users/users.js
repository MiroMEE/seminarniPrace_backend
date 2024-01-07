const schema = require('./schema');
const bcrypt = require('bcrypt');
module.exports = function(app){
    // registrace
    app.post('/api/user/vytvoritUzivatele',async(req,res)=>{
        try{
            const vytvareni = await schema.create(req.body);
            return res.status(200).json({"name":vytvareni.name,"id":vytvareni._id});
        } catch(error){
            return res.status(500).json({message:error.message});
        }
    })
    // přihlášení
    app.post('/api/user/prihlasitUzivatele',async(req,res)=>{
        const user = req.body;
        try{
            if(typeof user.email === 'undefined') throw {message:"Email není zadán"};
            const userFromScheme = await schema.findOne({
                email: user.email
            })
            if(typeof userFromScheme === 'undefined') throw {message:"Chyba při zadávání údajů."};
            if(typeof user.password === 'undefined') throw {message:"Heslo není zadáno"};
            if(!await bcrypt.compare(user.password, userFromScheme.password)) throw {message:"Heslo se neschoduje"};
            return res.status(200).json({message:"Schváleno!",id:userFromScheme._id});
        } catch(error){
            return res.status(500).json({message:error.message});
        }
    })
    app.post('/api/user/ziskatUzivatele',async(req,res)=>{
        const user = req.body;
        try{
            const userFromScheme = await schema.findOne({
                _id: user.id
            })
            return res.status(200).json(userFromScheme.name);
        } catch(error){
            return res.status(500).json({message:error.message});
        }
    })

    // app.put("/api/aktualizovatUzivatele", async(req,res)=>{
    //     const user = req.body;
    //     try{
    //         if (typeof user.name === 'undefined') throw {message:"není zjištěno jméno"};
    //         const user_from_database = await schema.findOne({name: user.name});
    //         if (typeof user.password === 'undefined') throw {message:"není zjištěno heslo"};
    //         if (!await bcrypt.compare(user.password,user_from_database.password)) throw {message:"Neshoduje se heslo"};
    //         user.password = undefined;
    //         await schema.updateOne({name:user.name},user);
    //         res.status(200).json({message:"změněno!"});
    //     } catch(error){
    //         res.status(500).json({message:error.message});
    //     }
    // })
}