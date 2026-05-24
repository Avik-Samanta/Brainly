import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const userMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers.token;
    const decoderUser = jwt.verify(token as string, JWT_SECRET);
    if(decoderUser){
        //@ts-ignore
        req.userId = decoderUser.userId;
        next();
    } else {
        res.status(403).json({
            message: "wrong token"
        });
    }
} 