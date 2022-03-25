"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/app");
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const request = require("supertest");
const typeorm_1 = require("../../../../shared/infra/typeorm");
let connection;
describe("Create Category Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // INSTALAR A LIB CROSS-ENV( yarn add cross-env -D ) para funcionar a conexao, ver package.json
        connection = yield (0, typeorm_1.default)();
        yield connection.runMigrations();
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcryptjs_1.hash)("admin", 8);
        yield connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
            VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.dropDatabase();
        yield connection.close();
    }));
    it("Should be able to create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield request(app_1.app).post("/sessions").send({
            email: "admim@rentalx.com.br",
            password: "admin"
        });
        const { refresh_token } = responseToken.body;
        const response = yield request(app_1.app).post("/categories").send({
            name: "test category",
            description: " Category test"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        });
        expect(response.status).toBe(201);
    }));
    it("Should not be able to create a new category with a name that already exists ", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield request(app_1.app).post("/sessions").send({
            email: "admim@rentalx.com.br",
            password: "admin"
        });
        const { refresh_token } = responseToken.body;
        const response = yield request(app_1.app).post("/categories").send({
            name: "test category",
            description: " Category test"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        });
        expect(response.status).toBe(400);
    }));
});
