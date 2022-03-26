"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _IStorageProvider = require("@shared/container/providers/storageProvider/IStorageProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

//X/Adicionar coluna avatar na tabela users
//X/refatorar user com coluna avatar
//configuração upload  multer
//criar regra de negocio do upload
//X/criar controller
let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarUseCase {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatar_file
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      //se existir um avatar no banco ele deleta o que esta na pasta
      await this.storageProvider.delete(user.avatar, "avatar"); //se ja existir um avatar salvo,          arquivo + caminho do arquivo
      //ele deleta(do folder nao do banco)
    }

    await this.storageProvider.save(avatar_file, "avatar"); //poe avatar recebido na pasta | arquivo + pasta

    user.avatar = avatar_file; //poe o nome do arquivo dentro do user.avatar

    await this.usersRepository.create(user); //vai fazer o update de user no banco
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;