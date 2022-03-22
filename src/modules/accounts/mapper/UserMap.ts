import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {

    //vai receber esse parametro do user e retornar eles como um IUserResponseDTO
    static toDTO({ email, name, id, avatar, driver_license }: User): IUserResponseDTO {

        return {
            email,
            name,
            id,
            avatar,
            driver_license
        }
    }
}

export { UserMap }