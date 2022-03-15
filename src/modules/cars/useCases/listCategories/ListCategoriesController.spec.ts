import { app } from "@shared/infra/http/app"

import { hash } from "bcryptjs"
import { v4 as uuidV4 } from "uuid"

const request = require("supertest")

import createConnection from "../../../../shared/infra/typeorm"
import { Connection } from "typeorm"

let connection: Connection
describe("List Categories", () => {

    beforeAll(async () => {
        // INSTALAR A LIB CROSS-ENV( yarn add cross-env -D ) para funcionar a conexao, ver package.json
        connection = await createConnection()

        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
            VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`
        )
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("Should be able list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admim@rentalx.com.br",
            password: "admin"
        })

        const { refresh_token } = responseToken.body


        await request(app).post("/categories").send({
            name: "test category",
            description: "Category test"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        const response = await request(app).get("/categories")



        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id")

    })



})