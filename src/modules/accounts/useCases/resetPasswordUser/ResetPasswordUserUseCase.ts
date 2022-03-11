import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs"

interface IRequest {
    token: string
    password: string
}
@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {

    }

    async execute({ token, password }: IRequest): Promise<void> {
        //repeat passowrd faltando

        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if (!userToken) {
            throw new AppError("Invalid token")
        }

        //se a data de expiração do token é antes da data atual(esta vencido)
        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {

            throw new AppError("Token expired")
        }


        const user = await this.usersRepository.findById(userToken.user_id)

        user.password = await hash(password, 8)//sobreescreve a senha pela nova

        await this.usersRepository.create(user)//update user

        await this.usersTokensRepository.deleteById(userToken.id)


    }
}

export { ResetPasswordUserUseCase }