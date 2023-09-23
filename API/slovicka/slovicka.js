const schema = require('./scheme');
module.exports = function(app){
    app.post("/api/vytvoritSlovicka", async(req,res)=>{
        try {
            const vytvoreneSlovicko = await schema.create(req.body);
            return res.status(200).json(vytvoreneSlovicko);
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    });
    app.get("/api/slovicko",async(req,res)=>{
        try {
            const slovicko = await schema.findOne({'_id':req.body.id});
            return res.status(200).json(slovicko);
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    })
    app.put("/api/slovicka/update",async(req,res)=>{
        const slovicko = req.body;
        try{
            await schema.findOneAndUpdate({_id:slovicko.id},slovicko);
            return res.status(200).json("Aktualizováno slovíčko: ",slovicko._id);
        } catch(error){
            return res.status(500).json({message:error.message});
        }
    })
    app.get('/api/slovicka',async(req,res)=>{
        try {
            const vsechna_slovicka = await schema.find({});
            return res.status(200).json(vsechna_slovicka);        
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    })
    app.delete("/api/slovicko",async(req,res)=>{
        try {
            await schema.deleteOne({_id:req.body.id});
            return res.status(200).json("Smazáná slovíčka",);
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    })
}