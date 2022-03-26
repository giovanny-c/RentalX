"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S3StorageProvider = void 0;

var _upload = _interopRequireDefault(require("@config/upload"));

var _awsSdk = require("aws-sdk");

var _path = require("path");

var fs = _interopRequireWildcard(require("fs"));

var mime = _interopRequireWildcard(require("mime"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.S3({
      region: process.env.AWS_BUCKET_REGION
    });
  }

  async save(file, folder) {
    const originalName = (0, _path.resolve)(_upload.default.tmpFolder, file); //local do arquivo , arquivo

    const bucketName = `${process.env.AWS_BUCKET}/${folder}`;
    const fileContent = await fs.promises.readFile(originalName); // pega o conteudo desse arquivo

    const ContentType = mime.getType(originalName);
    await this.client.putObject({
      Bucket: bucketName,
      //vai por no bucket da aws no folder passado
      Key: file,
      //tipo do objeto que vai ser salvo
      ACL: "public-read",
      //tipos de permissao
      Body: fileContent,
      // conteudo do arquivo
      ContentType //tipo do arquivo (png, jpg, ...etc)

    }).promise(); //transforma em promise

    await fs.promises.unlink(originalName); //retira ele da pasta tmp

    return file;
  }

  async delete(file, folder) {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      //vai por no bucket da aws no folder passado
      Key: file //tipo do objeto que vai ser salvo

    }).promise();
  }

}

exports.S3StorageProvider = S3StorageProvider;