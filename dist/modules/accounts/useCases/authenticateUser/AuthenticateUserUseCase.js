"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _AppError = require("@shared/errors/AppError");

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _auth = _interopRequireDefault(require("@config/auth"));

var _IDateProvider = require("@shared/container/providers/dateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  //Logins
  constructor(usersRepository, usersTokensRepository, dateProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    //user exist?
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_refresh_token_days,
      expires_in_refresh_token,
      expires_in_token,
      secret_refresh_token,
      secret_token
    } = _auth.default;

    if (!user) {
      throw new _AppError.AppError("Email or password incorret");
    } //senha correta?


    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Email or password incorret");
    } //gerando o token (json) com JWT


    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token //15 minutos

    }); //({payload}, "palavra chave", {subject e expiração} )
    //tip: fazer a palavra chave com md5 hash
    //gerando refresh_token

    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token //30 dias

    }); //adicionado 30 dias ao dia atual para expiração

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days); //colocando ele no banco

    await this.usersTokensRepository.create({
      refresh_token: refresh_token,
      expires_date: refresh_token_expires_date,
      user_id: user.id
    }); //TIP fazer uma validaçao por ip (se e o mesmo ip nao gera um novo token)

    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }; //COMO PASSAR O TOKEN PARA O REQ.HEADERS.AUTHORIZATION?

    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;