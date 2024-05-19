import mongoose from "mongoose";

// schéma
const DataScheme = new mongoose.Schema(
    {
        name:String,
        slovicka:Array,
        gameMode:String,
        hosted:String,
        players:Array
    }
);
export const DataModel = mongoose.model("data",DataScheme);

// při vytváření hry - id (CR)
export const createData = (values: Record<string, any>) => new DataModel(values).save();
export const getDataById = (id: string) => DataModel.findById(id);