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
exports.SESMailProvider = void 0;
const tsyringe_1 = require("tsyringe");
const aws_sdk_1 = require("aws-sdk");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
let SESMailProvider = class SESMailProvider {
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws_sdk_1.SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION
            })
        });
    }
    sendMail(to, subject, variables, path) {
        return __awaiter(this, void 0, void 0, function* () {
            //vai ler o arquivo e transformar em string utf-8
            const templateFileContent = fs.readFileSync(path).toString("utf-8");
            //fazer a leitrura do arquivo para o handlebars entender
            const templateParse = handlebars.compile(templateFileContent);
            //vai passar as variaveis para o template
            const templateHTML = templateParse(variables);
            yield this.client.sendMail({
                to,
                from: "",
                subject,
                html: templateHTML
            });
        });
    }
};
SESMailProvider = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SESMailProvider);
exports.SESMailProvider = SESMailProvider;
