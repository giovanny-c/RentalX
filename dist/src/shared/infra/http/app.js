"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//import "reflect-metadata" //yarn add reflect-metadata (se pedir) para tsyringe
const express = require("express");
require("express-async-errors");
const swaggerUi = require("swagger-ui-express");
const typeorm_1 = require("@shared/infra/typeorm"); //importa o index(arquivo que cria a conexao com o banco de dados)
require("@shared/container"); //importa o index (arquivo que inicaliza os repositorios e injeta as classe)
const routes_1 = require("./routes"); // /index.ts
const AppError_1 = require("@shared/errors/AppError");
const upload_1 = require("@config/upload");
//O Teste nao funciona com o import do swagger
//mport * as swaggerFile from "swagger.json"
const swaggerFile = require("swagger.json");
//se o import der erro 
//va em tsconfig.json
//e abilite o comando "resolveJsonModule": true, 
(0, typeorm_1.default)();
const app = express();
exports.app = app;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); //configurando o swagger
// a documentaçao vai estar no local dominio do app / api-docs (localhost:3333/api-docs)
app.use("/avatar", express.static(`${upload_1.default.tmpFolder}/avatar`));
//toda vez que uma rota /avatar for chamada
//vai acessar a pasta tmp/avatar
app.use("/cars", express.static(`${upload_1.default.tmpFolder}/cars`));
app.use(routes_1.router);
//middleware de error, sempre passar o erro primeiro nesse tipo de middleware
//vai usar esse middleware em todas as rotas
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) { // se o erro for da classe AppError(classe criada para tratar erros)
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});
