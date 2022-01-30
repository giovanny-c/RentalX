import express from "express"

import swaggerUi from "swagger-ui-express"

import "./database" //importa o index

import { router } from "./routes"// /index.ts

import swaggerFile from "./swagger.json"
// se o import der erro 
//va em tsconfig.json
//e abilite o comando "resolveJsonModule": true, 



const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))//configurando o swagger
// a documentaçao vai estar no local dominio do app / api-docs (localhost:3333/api-docs)

app.use(router)

app.listen(3333, () => console.log("Server is running"))