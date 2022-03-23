import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";



interface IRequest {
    user_id: string
    avatar_file: string
}

//X/Adicionar coluna avatar na tabela users
//X/refatorar user com coluna avatar
//configuração upload  multer
//criar regra de negocio do upload
//X/criar controller

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id)


        if (user.avatar) { //se existir um avatar no banco ele deleta o que esta na pasta
            await this.storageProvider.delete(user.avatar, "avatar")
            //se ja existir um avatar salvo,          arquivo + caminho do arquivo
            //ele deleta(do folder nao do banco)

        }

        await this.storageProvider.save(avatar_file, "avatar")
        //poe avatar recebido na pasta | arquivo + pasta

        user.avatar = avatar_file
        //poe o nome do arquivo dentro do user.avatar


        await this.usersRepository.create(user) //vai fazer o update de user no banco


    }

}

export { UpdateUserAvatarUseCase }