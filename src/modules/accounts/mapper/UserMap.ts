import { instanceToInstance } from "class-transformer"
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {

    //vai receber esse parametro do user e retornar eles como um IUserResponseDTO
    static toDTO({ email, name, id, avatar, driver_license, avatar_url }: User): IUserResponseDTO {

        //o instanceToInstance vai dar o expose na func avatar_url (pela propriedade "avatar_url") 
        //quando a resposta de user for criada
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url
        })

        return user

    }
}

export { UserMap }