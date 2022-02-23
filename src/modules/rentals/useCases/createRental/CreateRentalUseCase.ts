import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs = require("dayjs")
import { inject, injectable } from "tsyringe"




interface IRequest {
    user_id: string
    car_id: string
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {


    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const minRentTime = 24

        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {//se achar um car
            throw new AppError("This car is not available for rent right now")
        }

        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo user
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)


        if (rentalOpenToUser) {//se achar um user
            throw new AppError("There is already a rental in progress for this user")
        }

        //o aluguel deve ter duração minima de 24h

        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareDiferenceInHours(dateNow, expected_return_date)
        // vai comparar as duas e trazer a diferença em horas
        console.log(compare)
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