import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ProductModel from "./productModel";

class CommentModel extends Model {
    id: number | undefined;
    text: string | undefined;
    productId: number | undefined;
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
    },
    {
        sequelize,
        modelName: "CommentModel",
        tableName: "comments",
    }
);

export default CommentModel;
