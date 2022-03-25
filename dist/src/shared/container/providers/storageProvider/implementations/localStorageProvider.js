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
exports.LocalStorageProvider = void 0;
const upload_1 = require("@config/upload");
const fs = require("fs");
const path_1 = require("path");
class LocalStorageProvider {
    save(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            //vai mover o arquivo que foi para a 
            //pasta tmp para a pasta recebida nessa func
            yield fs.promises.rename(//move o arquivo para outro destino
            (0, path_1.resolve)(upload_1.default.tmpFolder, file), //pasta do arq. + o arquivo que ele vai mover
            (0, path_1.resolve)(`${upload_1.default.tmpFolder}/${folder}`, file) //pasta para onde ele será movido + o arquivo movido
            );
            return file;
        });
    }
    delete(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = (0, path_1.resolve)(`${upload_1.default.tmpFolder}/${folder}`, file);
            try {
                yield fs.promises.stat(filename); //verifica se um arquivo existe
            }
            catch (_a) {
                return; // se nao existir retorna (pra nao dar erro)
            }
            yield fs.promises.unlink(filename); //remove o arquivo
        });
    }
}
exports.LocalStorageProvider = LocalStorageProvider;
