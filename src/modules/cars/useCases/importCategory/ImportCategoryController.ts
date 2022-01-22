import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUseCase) {
        //cria o atributo ao instanciar a classe,
        //o atributo vai ser do tipo ICUC, que será passado de parametro
        //quando instanciar a classe
    }

    handle(req: Request, res: Response): Response {

        const { file } = req

        this.importCategoryUseCase.execute(file)

        return res.send()
    }

}

export { ImportCategoryController }