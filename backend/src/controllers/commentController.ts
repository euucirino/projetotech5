import { Request, Response } from "express";
import CommentModel from "../models/commentModel";

export const getAll = async (req: Request, res: Response) => {
    const comments = await CommentModel.findAll();
    res.send(comments);
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
    const comment = await CommentModel.findByPk(req.params.id);
    return res.json(comment);
};

export const create = async (req: Request, res: Response) => {
    try {
        const { text, productId } = req.body;
        if (!text || !productId) {
            return res.status(400).json({ error: "Valores obrigatórios" });
        }
        const comment = await CommentModel.create({ text, productId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error);
    }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { text, productId } = req.body;
        if (!text || !productId) {
            return res.status(400).json({ error: "Valores obrigatórios" });
        }
        const comment = await CommentModel.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comentário não encontrado" });
        }
        comment.text = text;
        comment.productId = productId;
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error);
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
        res.status(500).json("Erro interno no servidor " + error);
    }
};
