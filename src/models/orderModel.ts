import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public total_price!: number;
  public order_date!: Date;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: "order_data",
    modelName: "Order",
    timestamps: false, // Tắt quản lý thời gian tạo và cập nhật
  }
);

export default Order;
