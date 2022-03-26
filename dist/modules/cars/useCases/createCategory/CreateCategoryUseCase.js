"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor( // vai fazer a injeçao da classe CategoriesRepository(instancia-la)
  //ver src/shared/container/index.ts
  categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryAlredyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlredyExists) {
      throw new _AppError.AppError("Category alredy exists!");
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
/*
constructor(private categoriesRepository: ICategoriesRepository) {

}
*/
//cria um atributo que vai usar a interface de CatRepo (só vai aceitar classes que use essa interface)
//que vai acessar o repositorio que contem as categorias
//que sera passado quando a classe for instanciada (no arquivo de rotas)
//nao precisa usar o this.categoriesRepository = categoriesRepository

exports.CreateCategoryUseCase = CreateCategoryUseCase;