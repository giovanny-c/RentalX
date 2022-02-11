import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"

import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository"


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