import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";

import { CarImage } from "../entities/CarImage";


class CarsImagesRepository implements ICarsImageRepository {

    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage)
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {

        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
    }

    async findImageByCarId(car_id: string): Promise<CarImage[]> {


        const carImages = await this.repository.find({ car_id })

        return carImages
    }


    async DeleteImageByCarId(car_id: string): Promise<void> {

        await this.repository.createQueryBuilder()
            .delete()
            .from("cars_image")
            .where("car_id = :car_id", { car_id })
            .execute()
    }



}

export { CarsImagesRepository }