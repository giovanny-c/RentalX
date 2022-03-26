"use strict";

var _app = require("@shared/infra/http/app");

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const request = require("supertest");

let connection;
describe("List Categories", () => {
  beforeAll(async () => {
    // INSTALAR A LIB CROSS-ENV( yarn add cross-env -D ) para funcionar a conexao, ver package.json
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
            VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able list all categories", async () => {
    const responseToken = await request(_app.app).post("/sessions").send({
      email: "admim@rentalx.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    await request(_app.app).post("/categories").send({
      name: "test category",
      description: "Category test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const response = await request(_app.app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
  });
});