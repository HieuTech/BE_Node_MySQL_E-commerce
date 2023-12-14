import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../config/dbConfig"; 
import User from "./userModel"; 

class Cart extends Model {
  public id!: number;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly user?: User;

  public static associations: {
    user: Association<Cart, User>;
  };

  // Mixin to get associated User
  public getUser!: BelongsToGetAssociationMixin<User>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Thay thế bằng tên bảng User của bạn
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cart_data", // Thay thế bằng tên bảng Cart của bạn
    sequelize, // Chuyển đối tượng Sequelize vào model
  }
);

// Define associations
Cart.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default Cart;
