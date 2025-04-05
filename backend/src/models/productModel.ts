import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ProductModel extends Model {
    id: number | undefined;
    nome: string | undefined;
    marca: string | undefined;
    avaliacao: number | undefined;
    precoMedio: number | undefined;
    imagem: Buffer | undefined;
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avaliacao: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        precoMedio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ProductModel",
        tableName: "products",
    }
);

export default ProductModel;
