import mongoose from "mongoose";

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

export const createData = (values: Record<string, any>) => new DataModel(values).save();
export const getDataById = (id: string) => DataModel.findById(id);