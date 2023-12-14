import {Request,Response} from "express";
import User from "../models/userModel";

//Controller tạo mới người dùng

export const createUser = async(req:Request,res:Response)=>{
    try {
        const {username,email, password} = req.body;
        const newUser = User.create(email, password);

        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:" xay ra loi khi tao nguoi dung"})
        
    }
};
//lay thong tin nguoi dung theo ID
export const getUserById  =async (req:Request, res:Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error: "ko tim thay nguoi dung"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Da xay ra loi khi lay thong tin"})
        
    }
}

//cap nhat thong tin nguoi dung theo ID
export const updateUserById =async (req:Request, res:Response) => {
        try {
            const userId = req.params.id;
            const {username,email,password} = req.body;
            const user = await User.findByPk(userId);
            if(!user){
                return res.status(404).json({error:"ko tim thay user"})
            }
            await user.update(username,email,password);
            return res.status(200).json(user)

        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Loi xay ra khi cap nhat nguoi dung"})
            
        }
}
//xoa nguoi dung theo ID
export const deleteUserById = async (req:Request,res:Response)=>{
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error:"ko tim thay nguoi dung"})
        }
        await user.destroy();
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"da xay ra loi khi xoa nguoi dung"})
        
    }
}