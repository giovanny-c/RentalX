"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("@config/auth"));

var _AppError = require("@shared/errors/AppError");

var _IDateProvider = require("@shared/container/providers/dateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokenRepository, dateProvider) {
    this.usersTokenRepository = usersTokenRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token) {
    //é o refresh_token
    //verificando o refresh token com a palavra chave 
    const {
      email,
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token); //o retorno de verify será uma interface, 
    //contendo prop. sub e email tipo string

    const user_id = sub; // subject do token (contem o id do usuario)
    //procura o refresh token no banco

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new _AppError.AppError("Refresh Token does not exists");
    } //deleta o refresh token encontrado


    await this.usersTokenRepository.deleteById(userToken.id); //cria um novo refresh token

    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_refresh_token //30 dias

    }); //adicionado 30 dias ao dia atual para expiração

    const refresh_token_expires_date = this.dateProvider.addDays(_auth.default.expires_refresh_token_days); //colocando ele o banco

    await this.usersTokenRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user_id
    }); //gerando o token (json) com JWT

    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_token //15 minutos

    });
    return {
      token: newToken,
      refresh_token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;