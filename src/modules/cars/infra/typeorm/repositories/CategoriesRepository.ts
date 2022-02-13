import { getRepository, Repository } from "typeorm"
import { Category } from "../entities/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository"


class CategoriesRepository implements ICategoriesRepository {
    // Usa a interface 
    //interfaçe sao os metodos, atributos e retornos que a classe tem que ter
    //nao é uma extensao de outra classe


    private repository: Repository<Category> //cria um atributo 
    //que vai ser do tipo repository do typeorm
    //de category


    constructor() {
        this.repository = getRepository(Category)//para usar o  att repository como repositorio de Category
    }


    async create({ name, description }: ICreateCategoryDTO): Promise<void> { // : Promise tipo de retorno quando a funçao é async, <void> tipo de retorno vazio
        //usa a interface ICreateCategorysDTO

        const category = this.repository.create({
            description,
            name
        })

        await this.repository.save(category)

    }

    async list(): Promise<Category[]> {//vai retornar Um array de obj tipo category
        const categories = await this.repository.find()

        return categories

    }

    async findByName(name: string): Promise<Category> {//vai retornar um obj tipo catergory

        const category = await this.repository.findOne({ name })
        //Select * from categories where name = "name" limit 1

        return category
    }
}

export { CategoriesRepository }


/* ======== PRE-REFATORAÇÃO =================

class CategoriesRepository implements ICategoriesRepository {
    // Usa a interface 
    //interfaçe sao os metodos, atributos e retornos que a classe tem que ter
    //nao é uma extensao de outra classe


    private categories: Category[] = []
    //classe Category do model
    //vai usar a classe category de modelo para esse array
    //o array será um array de Category's
    //como privado só a classe usa ele


    // PARA INSTANCIAR A CLASSE APENAS UMA VEZ
    private static INSTANCE: CategoriesRepository

    private constructor() {// Somente a classe vai poder chamar o construtor
        this.categories = []
        //para o categories ser inicializado apenas quando
        //a classe for chamda
    }


    public static getIsntance(): CategoriesRepository {
        //vai ser responsavel para instanciar o repositorio
        // se ja tiver uma instancia criada vai repassar ela

        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository()
        }
        return CategoriesRepository.INSTANCE
    }

    create({ name, description }: ICreateCategoryDTO): void { // : void tipo de retorno
        //usa a interface ICreateCategorysDTO

        const category = new Category()
        //instanciando o obj para chamar o construtor (que faz o id)


        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })
        // vai atribuir os valores sem precisar fazer ex(category.name = name)

        this.categories.push(category)

    }

    list(): Category[] {//vai retornar Um array de obj tipo category
        return this.categories //retorna o atributo categories
        //que é um array de obj tipo category
    }

    findByName(name: string): Category {//vai retornar um obj tipo catergory

        const category = this.categories.find(category => category.name === name)
        //procura no array de categorias se tem alguma com o mesmo nome passado pela func

        return category
    }
}

export { CategoriesRepository }

*/