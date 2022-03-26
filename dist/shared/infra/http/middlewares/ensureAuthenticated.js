"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("../../../errors/AppError");

var _auth = _interopRequireDefault(require("@config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(req, res, next) {
  //Ve se é o user (se sim = esta logado)
  const authHeader = req.headers.authorization; //vai acessar o header para pegar o token de autorização

  if (!authHeader) {
    throw new _AppError.AppError("token missing", 401); //401, sem autorização
  } //token = Bearer s32dasd32s43443ffdf


  const [, token] = authHeader.split(" "); //vai separar o token aonde tiver espaço e vai por as partes no array
  //vai ignorar a primeira posiçao do array e a segunda vai por numa var token

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token); // token + palavra-chave(do useCase)
    //se der errado vai lançar a exeçao
    //ela retorna a data de criaçao, expiração, e o id(sub), que foi passado no useCase

    req.user = {
      //para passar o id para outras partes da rota (?do codigo tbm?)
      //o request foi sobreescrito para ter a propriedade user
      //ver src/@types/express/index.d.ts
      id: user_id
    };
    next();
  } catch (error) {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}