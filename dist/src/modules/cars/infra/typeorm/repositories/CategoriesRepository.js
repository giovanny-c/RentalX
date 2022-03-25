"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
class CategoriesRepository {
    //que vai ser do tipo repository do typeorm
    //de category
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Category_1.Category); //para usar o  att repository como repositorio de Category
    }
    create({ name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            //usa a interface ICreateCategorysDTO
            const category = this.repository.create({
                description,
                name
            });
            yield this.repository.save(category);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.repository.find();
            return categories;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.findOne({ name });
            //Select * from categories where name = "name" limit 1
            return category;
        });
    }
}
exports.CategoriesRepository = CategoriesRepository;
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
