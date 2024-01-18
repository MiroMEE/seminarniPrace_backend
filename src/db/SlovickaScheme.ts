import mongoose from "mongoose";

const SlovickaSchema = new mongoose.Schema(
    {
        name:String,
        username:String,
        slovicka_json:String,
        jazyk:String
    }
);
export const SlovickaModel = mongoose.model('Slovicka',SlovickaSchema)

export const getAllSlovicka = () => SlovickaModel.find();
export const getSlovickoById = (id:string) => SlovickaModel.findById(id);
export const getSlovickaByName = (name:string) => SlovickaModel.findOne({name});
export const createSlovicko = (values: Record<string, any>) => new SlovickaModel(values).save();
export const deleteSlovickoById = (id: string) => SlovickaModel.findOneAndDelete({_id:id});
export const updateSlovickoById = (id: string, values: Record<string, any>) => SlovickaModel.findByIdAndUpdate(id,values);