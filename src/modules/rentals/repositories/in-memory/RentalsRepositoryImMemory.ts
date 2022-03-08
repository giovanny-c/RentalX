import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryImMemory implements IRentalsRepository {

    async findByUser(user_id: string): Promise<Rental[]> {

        return this.rentals.filter(rental => rental.user_id === user_id)
    }


    async findById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id)
    }


    rentals: Rental[] = []

    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        })

        this.rentals.push(rental)

        return rental
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
        //retorna um carro se nao houver nenhuma data final(nenhum aluguel)
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
        //retorna um user se nao houver aluguel
    }




}

export { RentalsRepositoryImMemory }