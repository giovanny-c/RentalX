import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";


interface IFiles {//para conseguir acessar o filename do req.files
    filename: string
}

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params

        const i = req.files

        const images = req.files as IFiles[]//do multer

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

        const images_name = images.map(file => file.filename)

        await uploadCarImagesUseCase.execute({ car_id: id, images_name })

        return res.status(201).send()
    }
}

export { UploadCarImagesController }