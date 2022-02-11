import { inject, injectable } from "tsyringe"
import { AppError } from "@errors/AppError"

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository"


interface IRequest {
    name: string
    description: string
}

@injectable()//para a classe poder ser injetada
class CreateCategoryUseCase {


    constructor(
        @inject("CategoriesRepository")// vai fazer a injeçao da classe CategoriesRepository(instancia-la)
        //ver src/shared/container/index.ts
        private categoriesRepository: ICategoriesRepository) {

    }

    async execute({ name, description }: IRequest): Promise<void> {

        const categoryAlredyExists = await this.categoriesRepository.findByName(name)

        if (categoryAlredyExists) {

            throw new AppError("Category alredy exists!")
        }

        this.categoriesRepository.create({ name, description })

    }

}

export { CreateCategoryUseCase }


/*
constructor(private categoriesRepository: ICategoriesRepository) {

}
*/
 //cria um atributo que vai usar a interface de CatRepo (só vai aceitar classes que use essa interface)
//que vai acessar o repositorio que contem as categorias
//que sera passado quando a classe for instanciada (no arquivo de rotas)

//nao precisa usar o this.categoriesRepository = categoriesRepository