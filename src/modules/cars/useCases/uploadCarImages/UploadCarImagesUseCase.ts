import { inject, injectable } from "tsyringe";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/file"
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";

interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {

    }


    async execute({ car_id, images_name }: IRequest): Promise<void> {

        const toDeleteCarImages = await this.carsImageRepository.findImageByCarId(car_id)//pega as img para passar

        await this.carsImageRepository.DeleteImageByCarId(car_id)//deleta no bd as imgs antigas

        images_name.map(async (image) => { //percorre array de images
            await this.carsImageRepository.create(car_id, image)//salva a img no banco
            await this.storageProvider.save(image, "cars")//salva a img no storage(local ou no S3)
        })


        toDeleteCarImages.map(async (image) => {
            await this.storageProvider.delete(image.image_name, "cars")//deleta a img no storage(local ou no s3)

        })
        /**/
    }

}

export { UploadCarImagesUseCase }