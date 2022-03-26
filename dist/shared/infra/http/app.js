"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("express-async-errors");

var swaggerUi = _interopRequireWildcard(require("swagger-ui-express"));

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

require("@shared/container");

var _routes = require("./routes");

var _AppError = require("@shared/errors/AppError");

var _upload = _interopRequireDefault(require("@config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import "reflect-metadata" //yarn add reflect-metadata (se pedir) para tsyringe
const express = require("express");

//O Teste nao funciona com o import do swagger
//mport * as swaggerFile from "swagger.json"
const swaggerFile = require("swagger.json"); //se o import der erro 
//va em tsconfig.json
//e abilite o comando "resolveJsonModule": true, 


(0, _typeorm.default)();
const app = express();
exports.app = app;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); //configurando o swagger
// a documentaçao vai estar no local dominio do app / api-docs (localhost:3333/api-docs)

app.use("/avatar", express.static(`${_upload.default.tmpFolder}/avatar`)); //toda vez que uma rota /avatar for chamada
//vai acessar a pasta tmp/avatar

app.use("/cars", express.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router); //middleware de error, sempre passar o erro primeiro nesse tipo de middleware
//vai usar esse middleware em todas as rotas

app.use((err, req, res, next) => {
  if (err instanceof _AppError.AppError) {
    // se o erro for da classe AppError(classe criada para tratar erros)
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});