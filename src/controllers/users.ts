import express from 'express';

import { deleteUserById, getUsers, getUserById} from '../db/UserScheme';



export const getAllUsers = async (req:express.Request, res:express.Response) => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    } catch(error){
      console.error(error);
      return res.status(400).json({message:"něco je špatně"});
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if(!id){
        return res.status(404).json({message: 'id nenalezeno'})
      }
      const deletedUser = await deleteUserById(id);
      if(!deleteUser){
        return res.status(403).json({ message: 'uživatel nenalezen' });
      }
      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      return res.status(400).json({message:"něco je špatně"});
    }
  }

export const updateUser = async (req: express.Request, res: express.Response) => {
try {
    const { id } = req.params;
    const { username } = req.body;

    if (!id) {
      return res.status(404).json({message:"id nenalezeno"});
    }

    if (!username) {
      return res.status(404).json({message:"uživatel nenalezen"});
    }

    const user = await getUserById(id);
    
    if (!user) {
      return res.status(403).json({ message: 'uživatel nebyl nalezen v databázi' });
  }

    user.username = username;
    await user.save();

    return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).json({message:"něco je špatně"});
  }
}