import { inject, injectable } from "tsyringe";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/file"

interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ) {

    }


    async execute({ car_id, images_name }: IRequest): Promise<void> {

        const toDeleteCarImages = await this.carsImageRepository.findImageByCarId(car_id) //pega as img para passar

        await this.carsImageRepository.DeleteImageByCarId(car_id)//deleta no bd as imgs antigas

        images_name.map(async (image) => { //percorre o array com os paths das imagens

            await this.carsImageRepository.create(//e salva novas imgs, imagem por imagem no banco
                car_id,
                image
            )

        })

        toDeleteCarImages.map(async (image) => {

            await deleteFile(`./tmp/cars/${image.image_name}`)//para deletar todas as img locais
        })

    }

}

export { UploadCarImagesUseCase }