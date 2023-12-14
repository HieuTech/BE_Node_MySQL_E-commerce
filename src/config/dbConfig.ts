import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  pool: {
    max: 5, // Số kết nối tối đa trong pool
    min: 0, // Số kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để thử lấy kết nối (milliseconds)
    idle: 10000, // Thời gian tối đa một kết nối có thể trôi dạt mà không bị hủy bỏ (milliseconds)
  },
});

export default sequelize;
