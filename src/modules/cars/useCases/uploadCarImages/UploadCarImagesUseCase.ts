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



        images_name.map(async (image) => { //percorre o array com os paths das imagens

            if (image) {
                await deleteFile(`./tmp/car/${image}`)
                //se ja existir um image salvo, 
                //ele deleta(do folder nao do banco)

            }

            await this.carsImageRepository.create(//e salva imagem por imagem no banco
                car_id,
                image
            )
        })

    }

}

export { UploadCarImagesUseCase }