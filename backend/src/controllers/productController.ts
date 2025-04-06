import { Request, Response } from "express";
import ProductModel from "../models/productModel";

export const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await ProductModel.findAndCountAll({
    limit,
    offset,
  });

  res.status(200).json({
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  });
};

export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  const product = await ProductModel.findByPk(req.params.id);
  return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nome, marca, avaliacao, precoMedio, imagem } = req.body;

    if (!nome || !marca || !avaliacao || !precoMedio || !imagem) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const product = await ProductModel.create({ nome, marca, avaliacao, precoMedio, imagem });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { nome, marca, avaliacao, precoMedio, imagem } = req.body;

    if (!nome || !marca || !avaliacao || !precoMedio || !imagem) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    product.nome = nome;
    product.marca = marca;
    product.avaliacao = avaliacao;
    product.precoMedio = precoMedio;
    product.imagem = imagem;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const destroyProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
