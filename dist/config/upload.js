"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var crypto = _interopRequireWildcard(require("crypto"));

var _path = require("path");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const multer = require("multer");

//para fazer a referencia da pasta onde será salvo os uploads
//TODOS OS ARQUIVOS inicialmente serao salvos na pasta tmp
//ver providers/StorageProvider/implementations/** 
//que alterar o destino
//se os arquivos vao ser salvos localmente ou em um servidor
const tmpFolder = (0, _path.resolve)(__dirname, "..", "..", "tmp"); // resolve traz o caminho da pasta passada

var _default = {
  //ver providers/StorageProvider/implementations/** 
  tmpFolder,
  //caminho utilizado (pasta tmp na raiz)
  storage: multer.diskStorage({
    //permite passar infos de destino, e recriar o filename do arquivo
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex"); //vai criar um hash, para nao ter arquivos com nomes duplicados

      const fileName = `${fileHash}-${file.originalname}`; //vai juntar o hash com o nome original do arquivo

      return callback(null, fileName); //retorna o erro(1) e o nome do arquivo(2)
    } //é uma funçao que vai reescrever o nome do arquivo

  })
};
exports.default = _default;