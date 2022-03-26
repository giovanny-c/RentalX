"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageProvider = void 0;

var _upload = _interopRequireDefault(require("@config/upload"));

var fs = _interopRequireWildcard(require("fs"));

var _path = require("path");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocalStorageProvider {
  async save(file, folder) {
    //vai mover o arquivo que foi para a 
    //pasta tmp para a pasta recebida nessa func
    await fs.promises.rename( //move o arquivo para outro destino
    (0, _path.resolve)(_upload.default.tmpFolder, file), //pasta do arq. + o arquivo que ele vai mover
    (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file) //pasta para onde ele será movido + o arquivo movido
    );
    return file;
  }

  async delete(file, folder) {
    const filename = (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename); //verifica se um arquivo existe
    } catch {
      return; // se nao existir retorna (pra nao dar erro)
    }

    await fs.promises.unlink(filename); //remove o arquivo
  }

}

exports.LocalStorageProvider = LocalStorageProvider;