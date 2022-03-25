"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UpdateUserAvatarUseCase = void 0;
const tsyringe_1 = require("tsyringe");
//X/Adicionar coluna avatar na tabela users
//X/refatorar user com coluna avatar
//configuração upload  multer
//criar regra de negocio do upload
//X/criar controller
let UpdateUserAvatarUseCase = class UpdateUserAvatarUseCase {
    constructor(usersRepository, storageProvider) {
        this.usersRepository = usersRepository;
        this.storageProvider = storageProvider;
    }
    execute({ user_id, avatar_file }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(user_id);
            if (user.avatar) { //se existir um avatar no banco ele deleta o que esta na pasta
                yield this.storageProvider.delete(user.avatar, "avatar");
                //se ja existir um avatar salvo,          arquivo + caminho do arquivo
                //ele deleta(do folder nao do banco)
            }
            yield this.storageProvider.save(avatar_file, "avatar");
            //poe avatar recebido na pasta | arquivo + pasta
            user.avatar = avatar_file;
            //poe o nome do arquivo dentro do user.avatar
            yield this.usersRepository.create(user); //vai fazer o update de user no banco
        });
    }
};
UpdateUserAvatarUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository")),
    __param(1, (0, tsyringe_1.inject)("StorageProvider")),
    __metadata("design:paramtypes", [Object, Object])
], UpdateUserAvatarUseCase);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;
