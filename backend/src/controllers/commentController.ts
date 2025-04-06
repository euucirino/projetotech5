import { Request, Response } from "express";
import CommentModel from "../models/commentModel";

export const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await CommentModel.findAndCountAll({
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

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  const comment = await CommentModel.findByPk(req.params.id);
  return res.json(comment);
};

export const create = async (req: Request, res: Response) => {
  try {
    const { text, productId, userId } = req.body;

    if (!text || !productId || !userId) {
      return res.status(400).json({ error: "Valores obrigatórios" });
    }

    const comment = await CommentModel.create({ text, productId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { text, productId, userId } = req.body;

    if (!text || !productId || !userId) {
      return res.status(400).json({ error: "Valores obrigatórios" });
    }

    const comment = await CommentModel.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    comment.text = text;
    comment.productId = productId;
    comment.userId = userId;

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const comment = await CommentModel.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
