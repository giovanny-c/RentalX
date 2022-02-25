import { app } from "@shared/infra/http/app"

const request = require("supertest")

describe("Create Category Controller", () => {

    it("Should be able to create a new category", async () => {
        const response = await request(app).post("/categories").send({
            name: "test category",
            description: " Category test"
        })

        expect(response.status).toBe(201)
    })

})