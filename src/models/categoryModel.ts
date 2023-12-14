import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Category.init(
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
    tableName: "categories",
    modelName: "Category",
    timestamps: false, // Tắt quản lý thời gian tạo và cập nhật
  }
);

export default Category;
