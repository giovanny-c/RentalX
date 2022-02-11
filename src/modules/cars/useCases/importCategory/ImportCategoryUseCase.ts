import fs from "fs"
import { parse as csvParse } from "csv-parse"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { inject, injectable } from "tsyringe"

interface IImportCategory {
    name: string
    description: string
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {

    }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {//recebe o arquivo
        //o tipo de retorno vai ser uma promise do tipo IImportcategory

        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path) // cria uma stream dele, pra ler ele em pedaços

            const categories: IImportCategory[] = []

            const parseFile = csvParse() //para ler linha por linha

            stream.pipe(parseFile) //o pipe vai repassar o pedaço lido para o parseFile

            parseFile.on("data", async (line) => { //vai fazer algo em cada linha

                const [name, description] = line //vai desestruturar a linha, pega a primeira parte como nome e a segunda como description

                categories.push({ //vai por em categories
                    name,
                    description
                })

            }).on("end", () => { // do parse file, quando acabar, 
                //vai por o categories no resolve da promise 

                fs.promises.unlink(file.path)// remove o arquivo que foi salvo na paste tmp

                resolve(categories)

            }).on("error", (err) => {
                //vai mandar o erro pro reject
                reject(err)
            })


        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        //quando tem uma funçao async tem que ter o tipo 
        //de retorno como promise

        const categories = await this.loadCategories(file)

        categories.map(async category => { //para coloca-las no repositorio
            //o map precisa ser asincrono
            const { name, description } = category

            const existCategory = await this.categoriesRepository.findByName(name) //se tem uma cat. com o mesmo nome

            if (!existCategory) { // se nao existir
                await this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })

    }

}

export { ImportCategoryUseCase }