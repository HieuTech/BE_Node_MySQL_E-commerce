"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const userModel_1 = __importDefault(require("./userModel"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User", // Thay thế bằng tên bảng User của bạn
            key: "id",
        },
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: "Cart", // Thay thế bằng tên bảng Cart của bạn
    sequelize: // Thay thế bằng tên bảng Cart của bạn
    dbConfig_1.default, // Chuyển đối tượng Sequelize vào model
});
// Define associations
Cart.belongsTo(userModel_1.default, {
    foreignKey: "user_id",
    as: "user",
});
exports.default = Cart;
