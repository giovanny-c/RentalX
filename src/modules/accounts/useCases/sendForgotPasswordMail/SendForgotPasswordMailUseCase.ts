import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {

    }

    async execute(email: string): Promise<void> {
        //verificar se o user existe
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User does not exists!")
        }


        const token = uuidV4()

        const expires_date = this.dateProvider.addHours(3) //expira em tres hrs

        //passa o token criado com o uuid para a tabela
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })


        await this.mailProvider.sendMail(email, "Recuperação de senha", `O link para o reset de senha é ${token}`)



    }
}

export { SendForgotPasswordMailUseCase }