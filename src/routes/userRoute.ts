import express from "express";
import { createUser,getUserById,updateUserById,deleteUserById } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authMiddleware";
import { userMiddleware } from "../middlewares/userMiddleware";
const router = express.Router();

//dinh nghia tuyen

router.post("/users",userMiddleware.validateUser,createUser);
router.get("/users/:id",getUserById);//lay thong nguoi dung
router.put('/users/:id',userMiddleware.validateUserId,userMiddleware.checkUserExistence,authenticateUser,updateUserById);
router.delete("/users/:id",userMiddleware.validateUserId,userMiddleware.checkUserExistence,authenticateUser,deleteUserById);

export default router;