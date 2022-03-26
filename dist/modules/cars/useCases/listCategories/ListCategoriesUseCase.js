"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCategoriesUseCase {
  //private categoriesRepository: CategoriesRepository
  constructor(categoriesRepository) {//cria um atributo que vai usar a interface de CatRepo (só vai aceitar classes que use essa interface)
    //que vai acessar o repositorio que contem as categorias
    //que sera passado quando a classe for instanciada (no arquivo de rotas)
    //nao precisa usar o this.categoriesRepository = categoriesRepository

    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }

}) || _class) || _class) || _class) || _class);
exports.ListCategoriesUseCase = ListCategoriesUseCase;