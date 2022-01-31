import { Request, Response } from "express"

import { container } from "tsyringe"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


class CreateCategoryController {


    async handle(req: Request, res: Response): Promise<Response> {//vai retornar um tipo response

        const { name, description } = req.body

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)//esta injetando o useCase na variavel

        await createCategoryUseCase.execute({ name, description })

        return res.status(201).send()
    }

}

export { CreateCategoryController }