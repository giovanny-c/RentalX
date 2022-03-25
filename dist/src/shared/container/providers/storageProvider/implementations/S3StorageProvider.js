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
exports.S3StorageProvider = void 0;
const upload_1 = require("@config/upload");
const aws_sdk_1 = require("aws-sdk");
const path_1 = require("path");
const fs = require("fs");
const mime = require("mime");
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    save(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalName = (0, path_1.resolve)(upload_1.default.tmpFolder, file); //local do arquivo , arquivo
            const bucketName = `${process.env.AWS_BUCKET}/${folder}`;
            const fileContent = yield fs.promises.readFile(originalName); // pega o conteudo desse arquivo
            const ContentType = mime.getType(originalName);
            yield this.client.putObject({
                Bucket: bucketName,
                Key: file,
                ACL: "public-read",
                Body: fileContent,
                ContentType //tipo do arquivo (png, jpg, ...etc)
            }).promise(); //transforma em promise
            yield fs.promises.unlink(originalName); //retira ele da pasta tmp
            return file;
        });
    }
    delete(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file, //tipo do objeto que vai ser salvo
            }).promise();
        });
    }
}
exports.S3StorageProvider = S3StorageProvider;
