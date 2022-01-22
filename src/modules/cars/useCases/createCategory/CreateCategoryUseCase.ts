import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


interface IRequest {
    name: string
    description: string
}

//Definir o tipo de retorno
//alterar o retorno de erros
//acessar o repositorio

class CreateCategoryUseCase {

    //private categoriesRepository: CategoriesRepository

    constructor(private categoriesRepository: ICategoriesRepository) {
        //cria um atributo que vai usar a interface de CatRepo (só vai aceitar classes que use essa interface)
        //que vai acessar o repositorio que contem as categorias
        //que sera passado quando a classe for instanciada (no arquivo de rotas)

        //nao precisa usar o this.categoriesRepository = categoriesRepository
    }

    execute({ name, description }: IRequest): void {

        const categoryAlredyExists = this.categoriesRepository.findByName(name)

        if (categoryAlredyExists) {

            throw new Error("Category alredy exists!")
        }

        this.categoriesRepository.create({ name, description })

    }

}

export { CreateCategoryUseCase }