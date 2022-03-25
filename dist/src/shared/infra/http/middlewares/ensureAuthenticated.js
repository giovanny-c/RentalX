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
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../errors/AppError");
const auth_1 = require("@config/auth");
function ensureAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Ve se é o user (se sim = esta logado)
        const authHeader = req.headers.authorization;
        //vai acessar o header para pegar o token de autorização
        if (!authHeader) {
            throw new AppError_1.AppError("token missing", 401); //401, sem autorização
        }
        //token = Bearer s32dasd32s43443ffdf
        const [, token] = authHeader.split(" ");
        //vai separar o token aonde tiver espaço e vai por as partes no array
        //vai ignorar a primeira posiçao do array e a segunda vai por numa var token
        try {
            const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_token);
            // token + palavra-chave(do useCase)
            //se der errado vai lançar a exeçao
            //ela retorna a data de criaçao, expiração, e o id(sub), que foi passado no useCase
            req.user = {
                //o request foi sobreescrito para ter a propriedade user
                //ver src/@types/express/index.d.ts
                id: user_id
            };
            next();
        }
        catch (error) {
            throw new AppError_1.AppError("Invalid token!", 401);
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
