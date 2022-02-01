import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User) //Usando o Repositorio typeorm com a classe de user
        // o repository vira um repositorio para User?
    }



    async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license
        })

        await this.repository.save(user)

    }



    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user
    }



}

export {
    UsersRepository
}