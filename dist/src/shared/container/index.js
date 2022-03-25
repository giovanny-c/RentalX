"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("@shared/container/providers"); //importa os containers de providers
const CategoriesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");
const CarsRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsRepository");
const SpecificationsRepository_1 = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");
const UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
const CarsImageRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsImageRepository");
const RentalsRepository_1 = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");
const UsersTokensRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
//Esse arquivo Vai inicializar os Repositorios
//CategoryiesRepository pra dentro do registro singleton
//singleton = só uma instancia da classe
tsyringe_1.container.registerSingleton(//ICat. é o tipo(interface)
"CategoriesRepository", //nome
CategoriesRepository_1.CategoriesRepository //classe
);
//sempre que tiver uma implementaçao da interface
//ICategoriesRepository que
//tiver uma injeção apontando para o nome
//Vai usar a Classe
tsyringe_1.container.registerSingleton(//ICat. é o tipo(interface)
"SpecificationsRepository", //nome
SpecificationsRepository_1.SpecificationsRepository //classe
);
tsyringe_1.container.registerSingleton(//ICat. é o tipo(interface)
"UsersRepository", //nome
UsersRepository_1.UsersRepository //classe
);
tsyringe_1.container.registerSingleton(//ICat. é o tipo(interface)
"UsersTokensRepository", //nome
UsersTokensRepository_1.UsersTokensRepository //classe
);
tsyringe_1.container.registerSingleton("CarsRepository", CarsRepository_1.CarsRepository);
tsyringe_1.container.registerSingleton("CarsImageRepository", CarsImageRepository_1.CarsImagesRepository);
tsyringe_1.container.registerSingleton("RentalsRepository", RentalsRepository_1.RentalsRepository);
