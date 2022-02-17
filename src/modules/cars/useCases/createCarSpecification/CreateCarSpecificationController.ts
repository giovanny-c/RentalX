import { container } from "tsyringe";

import { Request, Response } from "express";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


class CreateCarSpecificationController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params
        const { specifications_ids } = req.body

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

        const car = await createCarSpecificationUseCase.execute({ car_id: id, specifications_ids })

        return res.json(car)
    }

}

export { CreateCarSpecificationController }