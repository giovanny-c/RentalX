import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //Ve se é o user (se sim = esta logado)

    const authHeader = req.headers.authorization
    //vai acessar o header para pegar o token de autorização

    if (!authHeader) {
        throw new AppError("token missing", 401)//401, sem autorização
    }

    //token = Bearer s32dasd32s43443ffdf

    const [, token] = authHeader.split(" ")
    //vai separar o token aonde tiver espaço e vai por as partes no array
    //vai ignorar a primeira posiçao do array e a segunda vai por numa var token

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_token,
        ) as IPayload
        // token + palavra-chave(do useCase)
        //se der errado vai lançar a exeçao
        //ela retorna a data de criaçao, expiração, e o id(sub), que foi passado no useCase


        req.user = { //para passar o id para outras partes da rota (?do codigo tbm?)
            //o request foi sobreescrito para ter a propriedade user
            //ver src/@types/express/index.d.ts
            id: user_id
        }

        next()

    } catch (error) {
        throw new AppError("Invalid token!", 401)
    }

}