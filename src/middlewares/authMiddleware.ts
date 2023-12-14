import { Request,Response, NextFunction } from "express";
import {verify, VerifyErrors, JwtPayload} from 'jsonwebtoken';
//middleware xác thực người dùng
export const authenticateUser = (req:Request,res:Response,next:NextFunction)=>{
    try {
      //thuc hien  xac thuc nguoi dung

      //1.kiem tra xem co token trong tieu de yeu cau hay ko
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
      }
      //2. gia su co ham kiem tra token va lay thong tin tu nguoi dung tu token
      const user = verifyAndDecodeToken(token);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: invalid token" });
      }
      
      // Kiểm tra token hết hạn
      if (tokenHasExpired(user)) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Token has expired" });
      }
      //gan thong tin nguoi dung vao yeu cau để sử dụng trong các tuyến sau
      req.user = user as JwtPayload;

      //xu li thanh cong thi goi next tiep tuc xu li cac tuyen tiep theo
      next();
    } catch (error) {
        console.error("Authen error: ", error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}
//kiem tra va giai ma token
const verifyAndDecodeToken =  (token:string):JwtPayload | null =>{
    try {
        //giai ma token
        const decodedUser = verify(token, process.env.SECRET_KEY || 'default-secret-key') as JwtPayload;

        return decodedUser;
        
    } catch (error) {
        console.log("error verifying token:", error);
        return null;
    }
}

//kiem tra token het han
const tokenHasExpired = (user: JwtPayload): boolean => {
  if (!user.exp) {
    // Nếu không có thông tin hết hạn trong token, coi như không hết hạn
    return false;
  }
  return Date.now() / 1000 >= user.exp;
};