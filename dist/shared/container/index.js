"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _CategoriesRepository = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CarsImageRepository = require("@modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

//Esse arquivo Vai inicializar os Repositorios
//CategoryiesRepository pra dentro do registro singleton
//singleton = só uma instancia da classe
_tsyringe.container.registerSingleton( //ICat. é o tipo(interface)
"CategoriesRepository", //nome
_CategoriesRepository.CategoriesRepository //classe
); //sempre que tiver uma implementaçao da interface
//ICategoriesRepository que
//tiver uma injeção apontando para o nome
//Vai usar a Classe


_tsyringe.container.registerSingleton( //ICat. é o tipo(interface)
"SpecificationsRepository", //nome
_SpecificationsRepository.SpecificationsRepository //classe
);

_tsyringe.container.registerSingleton( //ICat. é o tipo(interface)
"UsersRepository", //nome
_UsersRepository.UsersRepository //classe
);

_tsyringe.container.registerSingleton( //ICat. é o tipo(interface)
"UsersTokensRepository", //nome
_UsersTokensRepository.UsersTokensRepository //classe
);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImageRepository", _CarsImageRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);