import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {
        //cria o atributo que deve receber um parametro do mesmo 

    }


    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists")
        }

        await this.specificationsRepository.create({
            name,
            description
        })
    }
}

export { CreateSpecificationUseCase }