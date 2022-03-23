
import { container } from "tsyringe";

import "dotenv/config" //para as variaveis de ambiente funcionarem(se necessario)

import { IStorageProvider } from "./IStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { LocalStorageProvider } from "./implementations/localStorageProvider";


const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}
container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk] // se a variavel global for = local, usa o armazenamento local, se for = s3 usa o armz. da aws
)

