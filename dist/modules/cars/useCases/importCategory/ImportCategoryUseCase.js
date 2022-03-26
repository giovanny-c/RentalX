"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _csvParse = require("csv-parse");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

const fs = require("fs");

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file) {
    //recebe o arquivo
    //o tipo de retorno vai ser uma promise do tipo IImportcategory
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // cria uma stream dele, pra ler ele em pedaços

      const categories = [];
      const parseFile = (0, _csvParse.parse)(); //para ler linha por linha

      stream.pipe(parseFile); //o pipe vai repassar o pedaço lido para o parseFile

      parseFile.on("data", async line => {
        //vai fazer algo em cada linha
        const [name, description] = line; //vai desestruturar a linha, pega a primeira parte como nome e a segunda como description

        categories.push({
          //vai por em categories
          name,
          description
        });
      }).on("end", () => {
        // do parse file, quando acabar, 
        //vai por o categories no resolve da promise 
        fs.promises.unlink(file.path); // remove o arquivo que foi salvo na paste tmp

        resolve(categories);
      }).on("error", err => {
        //vai mandar o erro pro reject
        reject(err);
      });
    });
  }

  async execute(file) {
    //quando tem uma funçao async tem que ter o tipo 
    //de retorno como promise
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      //para coloca-las no repositorio
      //o map precisa ser asincrono
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoriesRepository.findByName(name); //se tem uma cat. com o mesmo nome

      if (!existCategory) {
        // se nao existir
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }

}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;