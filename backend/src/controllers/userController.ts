import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { validarEmail } from "../validations/validarEmail";
import { validarCPF } from "../validations/validarCpf";
import { validarSeASenhaEForte } from "../validations/validarSenha";

export const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await UserModel.findAndCountAll({
    limit,
    offset
  });

  res.json({
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    users: rows
  });
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const user = await UserModel.findByPk(req.params.id);
  return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;

    if (!name || !email || !cpf || !password) {
      return res.status(400).json({ error: 'Valores obrigatórios' });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    if (!validarSeASenhaEForte(password)) {
      return res.status(400).json({ error: 'Senha fraca' });
    }

    const user = await UserModel.create({ name, email, cpf, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;

    if (!name || !email || !cpf || !password) {
      return res.status(400).json({ error: 'Valores obrigatórios' });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (email !== user.email) {
      return res.status(400).json({ error: 'Não é permitido alterar o e-mail' });
    }

    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    if (!validarSeASenhaEForte(password)) {
      return res.status(400).json({ error: 'Senha fraca' });
    }

    user.name = name;
    user.cpf = cpf;
    user.password = password;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const destroyUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
