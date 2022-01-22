import { Request, Response } from "express";

import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase"

class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }
    //cria um atributo que vai ser do tipo CCUS (só vai aceitar essa classe)
    //que sera passado quando a classe for instanciada (no arquivo de rotas)


    handle(req: Request, res: Response): Response {

        const all = this.listCategoriesUseCase.execute()

        return res.json(all)
    }

}


export { ListCategoriesController }