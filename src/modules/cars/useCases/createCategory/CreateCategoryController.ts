import { Request, Response } from "express"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


class CreateCategoryController {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }
    //cria um atributo que vai ser do tipo CCUS (só vai aceitar essa classe)
    //que sera passado quando a classe for instanciada (no arquivo de rotas)

    async handle(req: Request, res: Response): Promise<Response> {//vai retornar um tipo response

        const { name, description } = req.body

        await this.createCategoryUseCase.execute({ name, description })

        return res.status(201).send()
    }

}

export { CreateCategoryController }