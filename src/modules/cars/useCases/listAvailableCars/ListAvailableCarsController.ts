import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


class ListAvailableCarsControler {

    async handle(req: Request, res: Response): Promise<Response> {

        const { brand, name, category_id } = req.query

        const listAvailableCarsUsecase = container.resolve(ListAvailableCarsUseCase)

        const cars = await listAvailableCarsUsecase.execute({
            brand: brand as string, //forçando os parametro como tipo string, pois o query params pode ter outro tipo de dados
            name: name as string,
            category_id: category_id as string
        })

        return res.json(cars)
    }

}

export { ListAvailableCarsControler }