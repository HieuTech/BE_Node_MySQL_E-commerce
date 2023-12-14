import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category_id!: number;
  public image_url!: string;
  public stock_quantity!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: "product_data",
    modelName: "Product",
    timestamps: false, // Tắt quản lý thời gian tạo và cập nhật
  }
);

export default Product;
