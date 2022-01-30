import { Category } from "../entities/Category"

//DTO = Data Transfer 
interface ICreateCategoryDTO { //interface de criação da categoria
    name: string
    description: string

}


interface ICategoriesRepository {

    findByName(name: string): Promise<Category>

    list(): Promise<Category[]>

    create({ name, description }: ICreateCategoryDTO): Promise<void>

}

export { ICategoriesRepository, ICreateCategoryDTO }