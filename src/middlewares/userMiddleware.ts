import express, { Request, Response, NextFunction } from "express";
import sequelize from "../config/dbConfig";
import { QueryTypes } from "sequelize";
export const userMiddleware = {
  validateUser(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing user infomation",
      });
    }
    next();
  },

  validateUserId(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const userIdNumber = parseInt(userId, 10); // Chuyển đổi userId thành kiểu số
    if (isNaN(userIdNumber)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    next();
  },

  async checkUserExistence(req:Request, res:Response, next:NextFunction){
    try {
        const userId = req.params.id;
        const query = "SELECT * FROM users WHERE id = ?";
        const [user] = await sequelize.query(query,{
            replacements:[userId],
            type: QueryTypes.SELECT,
        });
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        next();
        
    } catch (error) {
        res.status(500).json({
            message:"ko the kiem tra ton tai"
        })
        next(error);
    }
  }
};
