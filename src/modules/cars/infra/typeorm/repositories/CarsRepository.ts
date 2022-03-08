import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";



class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            fine_amount,
            daily_rate,
            brand,
            category_id,
            license_plate,
            specifications,
            id
        })

        await this.repository.save(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })

        return car
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

        const carsQuery = await this.repository
            .createQueryBuilder("c")// "c" = atalho para usar na busca
            .where("available = :available", { available: true }) // :available = atributo, {available = true} = setando valor do atributo
        //traz se tiver cars.available === true

        if (brand) {//se existir um brand vai adicionar ele a query
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }



        const cars = await carsQuery.getMany() //pega varios resultados

        return cars
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id)

        return car
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {

        await this.repository.createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id", { id })
            .execute()


    }

}

export { CarsRepository }