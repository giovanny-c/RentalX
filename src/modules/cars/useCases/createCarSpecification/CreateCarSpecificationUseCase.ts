// import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string
    specifications_ids: string[]
}

// @injectable()
class CreateCarSpecificationUseCase {

    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        private specificationsRepository: ISpecificationsRepository
    ) {

    }

    async execute({ car_id, specifications_ids }: IRequest): Promise<void> {

        const carExists = await this.carsRepository.findById(car_id)

        if (!carExists) {

            throw new AppError("Car does not exists!")
        }


        const specifications = await this.specificationsRepository.findByIds(specifications_ids)
        console.log(specifications)
        //vai procurar todas as especificaçoes
        //na tabela  specifications
        //que tenham os ids que foram passados


        carExists.specifications = specifications
        console.log(carExists)
        //pega as specificaçoes encontradas 
        //e poe dentro da propriedade specifications do carro

        await this.carsRepository.create(carExists) // vai fazer um update de cars

        console.log(carExists)
    }


}

export { CreateCarSpecificationUseCase }