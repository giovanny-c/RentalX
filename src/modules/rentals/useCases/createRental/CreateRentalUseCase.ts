import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
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
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository

    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const minRentTime = 24

        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        // se o carro nao foi entregue ainda
        if (carUnavailable) { //se achar um aluguel com esse carro que nao foi terminado
            throw new AppError("This car is not available for rent right now")
        }


        //nao deve ser possivel cadastrar mais de um aluguel para o mesmo user
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        //se o usuario possuir um aluguel em andamento
        if (rentalOpenToUser) {//se achar um aluguel com esse user emandamento
            throw new AppError("There is already a rental in progress for this user")
        }

        //o aluguel deve ter duração minima de 24h

        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareDiferenceInHours(dateNow, expected_return_date)
        // vai comparar as duas e trazer a diferença em horas

        if (compare < minRentTime) {
            throw new AppError("The rent should be longer than 1 day (24 hours)")
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        })

        await this.carsRepository.updateAvailable(car_id, false)

        return rental
    }

}

export { CreateRentalUseCase }