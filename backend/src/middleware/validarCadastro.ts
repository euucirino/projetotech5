
import { Request, Response, NextFunction } from "express";
import { validarCPF } from "../validations/validarCpf";
import { validarEmail } from "../validations/validarEmail";
import { validarSeASenhaEForte } from "../validations/validarSenha";

export const validarCadastro = (req: Request, res: Response, next: NextFunction) => {
  const { cpf, email, senha } = req.body;

  if (!validarCPF(cpf)) {
    return res.status(400).json({ erro: "CPF inválido" });
  }

  if (!validarEmail(email)) {
    return res.status(400).json({ erro: "E-mail inválido" });
  }

  if (!validarSeASenhaEForte(senha)) {
    return res.status(400).json({ erro: "Senha fraca" });
  }

  next();
};
