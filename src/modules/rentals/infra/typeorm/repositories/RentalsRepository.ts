import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }

    async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total
        })

        await this.repository.save(rental)

        return rental

    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: null } //vai trazer um rental pelo carro se o end_date nao existir(o carro nao foi entregue)
        })

        return openByCar
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: null } //vai trazer um rental pelo user se o end_date nao existir(o carro nao foi entregue)
        })

        return openByUser
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.repository.findOne(id)

        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {

        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"] //chama o relacionamento para trazer o carro referente ao car_id encontrado
            //ver em entities/Rentals
        })

        return rentals
    }

}

export { RentalsRepository }