import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel'

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_bem_secreto'
const JWT_EXPIRES_IN = '7d';

export const generateToken = (user: UserModel): string => {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) : any => {
    return jwt.verify(token, JWT_SECRET)
}