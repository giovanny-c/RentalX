import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"
import * as dayjs from "dayjs"

import * as utc from "dayjs/plugin/utc"

dayjs.extend(utc)

interface IRequest {
    user_id: string
    car_id: string
    expected_return_date: Date
}

class CreateRentalUseCase {


    constructor(
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const minRentTime = 24

        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {
            throw new AppError("This car is not available for rent right now")
        }

        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo user
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)


        if (rentalOpenToUser) {
            throw new AppError("There is already a rental in progress for this user")
        }

        //o aluguel deve ter duração minima de 24h
        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()

        const dateNow = dayjs().utc().local().format()

        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")
        // vai comparar as duas e trazer a diferença em horas

        if (compare < minRentTime) {
            throw new AppError("The rent should be longer than 1 day (24 hours)")
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        })

        return rental
    }

}

export { CreateRentalUseCase }