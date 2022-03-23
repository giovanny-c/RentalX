
import { container } from "tsyringe";

import "dotenv/config" //para as variaveis de ambiente funcionarem(se necessario)

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

