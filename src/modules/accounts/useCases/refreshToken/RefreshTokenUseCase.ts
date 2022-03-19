import { inject, injectable } from "tsyringe"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { sign, verify } from "jsonwebtoken"
import auth from "@config/auth"
import { AppError } from "@shared/errors/AppError"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider"

interface IPayload {
    sub: string
    email: string
}
interface ITokenResponse {
    token: string
    refresh_token: string
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }



    async execute(token: string): Promise<ITokenResponse> {//é o refresh_token

        //verificando o refresh token com a palavra chave 
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
        //o retorno de verify será uma interface, 
        //contendo prop. sub e email tipo string

        const user_id = sub // subject do token (contem o id do usuario)
        console.log(user_id)
        console.log(token)
        //procura o refresh token no banco
        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)
        console.log(userToken)
        if (!userToken) {
            throw new AppError("Refresh Token does not exists")
        }

        //deleta o refresh token encontrado
        await this.usersTokenRepository.deleteById(userToken.id)

        //cria um novo refresh token
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token//30 dias
        })

        //adicionado 30 dias ao dia atual para expiração
        const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

        //colocando ele o banco
        await this.usersTokenRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: user_id
        })

        //gerando o token (json) com JWT
        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token//15 minutos
        })


        return {
            token: newToken,
            refresh_token
        }



    }
}

export { RefreshTokenUseCase }