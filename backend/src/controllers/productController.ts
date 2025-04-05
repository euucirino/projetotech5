import { Request, Response } from "express";
import ProductModel from "../models/productModel";

export const getAll = async (req: Request, res: Response) => {
    const products = await ProductModel.findAll();
    res.send(products);
};

export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    const product = await ProductModel.findByPk(req.params.id);
    return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { nome, marca, avaliacao, precoMedio, imagem } = req.body;
        if (!nome || !marca || !avaliacao || !precoMedio || !imagem) {
            return res.status(400).json({ error: "Values required" });
        }
        const product = await ProductModel.create({ nome, marca, avaliacao, precoMedio, imagem });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error);
    }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { nome, marca, avaliacao, precoMedio, imagem } = req.body;
        if (!nome || !marca || !avaliacao || !precoMedio || !imagem) {
            return res.status(400).json({ error: "Values required" });
        }
        const product = await ProductModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        product.nome = nome;
        product.marca = marca;
        product.avaliacao = avaliacao;
        product.precoMedio = precoMedio;
        product.imagem = imagem;
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error);
    }
};

export const destroyProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await ProductModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error);
    }
};
