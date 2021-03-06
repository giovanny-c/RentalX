

import { container } from "tsyringe"

import "@shared/container/providers/index" //importa os containers de providers

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImagesRepository"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository"

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository"



//Esse arquivo Vai inicializar os Repositorios

//CategoryiesRepository pra dentro do registro singleton
//singleton = só uma instancia da classe
container.registerSingleton<ICategoriesRepository>( //ICat. é o tipo(interface)
    "CategoriesRepository",//nome
    CategoriesRepository //classe
)
//sempre que tiver uma implementaçao da interface
//ICategoriesRepository que
//tiver uma injeção apontando para o nome
//Vai usar a Classe

container.registerSingleton<ISpecificationsRepository>( //ICat. é o tipo(interface)
    "SpecificationsRepository",//nome
    SpecificationsRepository //classe
)

container.registerSingleton<IUsersRepository>( //ICat. é o tipo(interface)
    "UsersRepository",//nome
    UsersRepository //classe
)

container.registerSingleton<IUsersTokensRepository>( //ICat. é o tipo(interface)
    "UsersTokensRepository",//nome
    UsersTokensRepository //classe
)


container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

