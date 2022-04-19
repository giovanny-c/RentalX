//import "reflect-metadata" //yarn add reflect-metadata (se pedir) para tsyringe
import * as express from "express"

import { NextFunction, Request, Response } from "express"

import "express-async-errors"

import * as swaggerUi from "swagger-ui-express"

import * as cors from "cors"

import * as Sentry from "@sentry/node";

import * as Tracing from "@sentry/tracing";

import createConnection from "@shared/infra/typeorm" //importa o index(arquivo que cria a conexao com o banco de dados)

import "@shared/container" //importa o index (arquivo que inicaliza os repositorios e injeta as classe)

import { router } from "./routes"// /index.ts

import { AppError } from "@shared/errors/AppError"

import rateLimiter from "@shared/infra/http/middlewares/rateLimiter"//middleware que impede ataques por ddos e bruteforce

import upload from "@config/upload"

//O Teste nao funciona com o import do swagger
//mport * as swaggerFile from "swagger.json"
const swaggerFile = require("./../../../swagger.json")
//se o import der erro 
//va em tsconfig.json
//e abilite o comando "resolveJsonModule": true, 


createConnection()

const app = express()

app.use(rateLimiter)

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))//configurando o swagger
// a documentaçao vai estar no local dominio do app / api-docs (localhost:3333/api-docs)

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
//toda vez que uma rota /avatar for chamada
//vai acessar a pasta tmp/avatar

app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(cors())

app.use(router)

app.use(Sentry.Handlers.errorHandler())

//middleware de error, sempre passar o erro primeiro nesse tipo de middleware
//vai usar esse middleware em todas as rotas
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof AppError) { // se o erro for da classe AppError(classe criada para tratar erros)
        return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

export { app }