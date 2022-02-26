import { app } from "@shared/infra/http/app"

import { hash } from "bcryptjs"
import { v4 as uuidV4 } from "uuid"

const request = require("supertest")

import createConnection from "../../../../shared/infra/typeorm"
import { Connection } from "typeorm"

let connection: Connection
describe("Create Category Controller", () => {

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
    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admim@rentalx.com.br",
            password: "admin"
        })

        const { token } = responseToken.body


        const response = await request(app).post("/categories").send({
            name: "test category",
            description: " Category test"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })

})