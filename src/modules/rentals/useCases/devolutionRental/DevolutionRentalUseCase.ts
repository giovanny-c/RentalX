import { inject, injectable } from "tsyringe"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"

interface IRequest {
    rent_id: string
    user_id: string

}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ rent_id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rent_id)
        const car = await this.carsRepository.findById(rental.car_id)
        const minimum_daily = 1

        if (!rental) {
            throw new AppError("Rental does not exists")
        }


        //verificar o tempo de aluguel

        const dateNow = this.dateProvider.dateNow()//quando o carro foi entregue

        let daily = this.dateProvider.compareInDays( //diaria
            rental.start_date,
            dateNow
        )

        if (daily <= 0) {//se foi entregue em menos de 24h(0 dias), será cobrado 1 diaria
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInDays(//para calcular se houve atraso 
            dateNow,
            rental.expected_return_date
        )

        let total = 0

        if (delay > 0) {//se houver atraso vai calcular a multa (mais de 0 dia(24h) de diferença )
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total += daily * car.daily_rate //calcula com o valor das diarias

        rental.end_date = this.dateProvider.dateNow()//poe a data de termino no rent
        rental.total = total

        await this.rentalsRepository.create(rental)

        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }


}
export { DevolutionRentalUseCase }