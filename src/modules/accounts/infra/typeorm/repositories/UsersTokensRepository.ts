import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";


class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UsersTokens>

    constructor() {
        this.repository = getRepository(UsersTokens)
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UsersTokens> {

        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken

    }



}

export { UsersTokensRepository }