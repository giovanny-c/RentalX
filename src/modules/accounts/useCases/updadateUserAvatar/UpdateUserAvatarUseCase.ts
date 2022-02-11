import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { deleteFile } from "@utils/file"

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
        private usersRepository: IUsersRepository) {

    }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id)

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`)
            //se ja existir um avatar salvo, 
            //ele deleta(do folder nao do banco)

        }

        user.avatar = avatar_file
        //poe a file dentro do avatar
        //(só a referencia da file)

        await this.usersRepository.create(user) //vai fazer o update de user


    }

}

export { UpdateUserAvatarUseCase }