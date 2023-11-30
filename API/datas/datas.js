const schema = require('./scheme');
module.exports = function(app){
    app.post("/api/datas/vytvoritHru",async(req,res)=>{
        try {
            const vytvoritHru = await schema.create(req.body);
            return res.status(200).json(vytvoritHru);
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    });
    app.get("/api/datas/ziskatHru/:id",async(req,res)=>{
        const {id} = req.params;
        try {
            const hra = await schema.findOne({'_id':id});
            return res.status(200).json(hra);
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    })
    // app.put("/api/teorie/update",async(req,res)=>{
    //     const teorie = req.body;
    //     try{
    //         await schema.findOneAndUpdate({_id:teorie.id},teorie);
    //         return res.status(200).json("Aktualizováno")
    //     } catch(error){
    //         return res.status(500).json({message:error.message})
    //     }
    // })
    // app.get('/api/teorie/vsechnyTeorie',async(req,res)=>{
    //     try {
    //         const vsechnyTeorie = await schema.find({});
    //         return res.status(200).json(vsechnyTeorie);        
    //     } catch (error) {
    //         return res.status(500).json({message:error.message});
    //     }
    // })
    // app.post("/api/teorie",async(req,res)=>{
    //     try {
    //         await schema.deleteOne({_id:req.body.id});
    //         return res.status(200).json("Smazána teorie.");
    //     } catch (error) {
    //         return res.status(500).json({message:error.message});
    //     }
    // })
}