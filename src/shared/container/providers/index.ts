
import { container } from "tsyringe";

import "dotenv/config" //para as variaveis de ambiente

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/DayjsDateProvider";

import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealMailProvider } from "./mailProvider/implementations/EtherealMailProvider";

import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/localStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}
container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk] // se a variavel global for = local, usa o armazenamento local, se for = s3 usa o armz. da aws
)