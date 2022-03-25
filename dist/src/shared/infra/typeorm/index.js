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
const typeorm_1 = require("typeorm");
// interface IOptions {
//     host: string
// }
// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions
//     newOptions.host = 'database_ignite'//Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados no docker (nome do container)
//     createConnection({
//         ...options,
//     })
// })
//                           database_ignite ?
exports.default = (host = "database_ignite") => __awaiter(void 0, void 0, void 0, function* () {
    const defaultOptions = yield (0, typeorm_1.getConnectionOptions)();
    return (0, typeorm_1.createConnection)(Object.assign(defaultOptions, {
        host: process.env.NODE_ENV === "test" ? "localhost" : host,
        database: process.env.NODE_ENV === "test" ? "rentalx_test" : defaultOptions.database // se NODE_ENV for === test usa o banco de teste, se nao usa o padrao
        //ver no package.json
        //"test": "set NODE_ENV=test & jest" ou (nao funcionou)
        //"test": "NODE_ENV=test & jest" ou (funcionou)
        //"cross-env NODE_ENV=test&&jest --runInBand --detectOpenHandles"
        //yarn add cross-env -D
    }));
});
