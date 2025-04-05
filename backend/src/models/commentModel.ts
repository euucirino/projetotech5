import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ProductModel from "./productModel";
import UserModel from "./userModel";

class CommentModel extends Model {
  id: number | undefined;
  text: string | undefined;
  productId: number | undefined;
  userId: number | undefined;
}

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "CommentModel",
    tableName: "comments",
  }
);

export default CommentModel;
