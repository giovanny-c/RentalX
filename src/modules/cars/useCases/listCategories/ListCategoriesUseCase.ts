import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { Category } from "../../entities/Category"

class ListCategoriesUseCase {

    //private categoriesRepository: CategoriesRepository

    constructor(private categoriesRepository: ICategoriesRepository) {
        //cria um atributo que vai usar a interface de CatRepo (só vai aceitar classes que use essa interface)
        //que vai acessar o repositorio que contem as categorias
        //que sera passado quando a classe for instanciada (no arquivo de rotas)

        //nao precisa usar o this.categoriesRepository = categoriesRepository
    }

    execute(): Category[] {

        const categories = this.categoriesRepository.list()

        return categories

    }


}

export { ListCategoriesUseCase }