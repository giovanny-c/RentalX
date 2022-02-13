import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    }
    token: string
}


@injectable()
class AuthenticateUserUseCase { //Logins

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {

    }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //user exist?
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email or password incorret")
        }

        //senha correta?
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email or password incorret")
        }

        //gerar o token (json)
        const token = sign({}, "1d480f463f552ef5824709ac10b9f920", {
            subject: user.id,
            expiresIn: "1d"
        })
        //({payload}, "palavra chave", {subject e expiração} )
        //tip: fazer a palavra chave com md5 hash



        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }


        //PASSAR O TOKEN PARA O REQ.HEADERS.AUTHORIZATION

        return tokenReturn
    }

}

export { AuthenticateUserUseCase }