import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll();
    res.send(users);
};

export const getUserById = async (
    req: Request<{ id: string }>, 
    res: Response
) => {
    const user = await UserModel.findByPk(req.params.id);
    return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, cpf, password } = req.body;

        if (!name || !email || !cpf || !password) {
            return res.status(400).json({ error: 'Valores obrigatórios' });
        }
        
        const user = await UserModel.create({ name, email, cpf, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};

export const updateUser = async (
    req: Request<{ id: string }>, 
    res: Response
) => {
    try {
        const { name, email, cpf, password } = req.body;

        if (!name || !email || !cpf || !password) {
            return res.status(400).json({ error: 'Valores obrigatórios' });
        }

        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        user.name = name;
        user.email = email;
        user.cpf = cpf;
        user.password = password;
        
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};

export const destroyUserById = async (
    req: Request<{ id: string }>, 
    res: Response
) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};
