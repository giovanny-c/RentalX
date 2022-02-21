import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImageRepository {

    create(car_id: string, image_name: string): Promise<CarImage>
    findImageByCarId(car_id: string): Promise<CarImage[]>
    DeleteImageByCarId(car_id: string): Promise<void>
}

export { ICarsImageRepository }