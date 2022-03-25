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
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const index_1 = require("../index");
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, index_1.default)("localhost");
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcryptjs_1.hash)("admin", 8);
        yield connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
        VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`);
        //await (se der erro)
        connection.close;
    });
}
create().then(() => console.log("User admin created!"));
