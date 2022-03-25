"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("dotenv/config"); //para as variaveis de ambiente funcionarem(se necessario)
const S3StorageProvider_1 = require("./implementations/S3StorageProvider");
const localStorageProvider_1 = require("./implementations/localStorageProvider");
const diskStorage = {
    local: localStorageProvider_1.LocalStorageProvider,
    s3: S3StorageProvider_1.S3StorageProvider
};
tsyringe_1.container.registerSingleton("StorageProvider", diskStorage[process.env.disk] // se a variavel global for = local, usa o armazenamento local, se for = s3 usa o armz. da aws
);
