import mongoose from 'mongoose';

// schéma
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password: { type: String, required: true, select: false }
})

export const UserModel = mongoose.model('User',UserSchema);

// CRUD atd... pro uživatele
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByName = (username: string) => UserModel.findOne({ username });
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);