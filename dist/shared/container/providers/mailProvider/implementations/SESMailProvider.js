"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _tsyringe = require("tsyringe");

var _awsSdk = require("aws-sdk");

var nodemailer = _interopRequireWildcard(require("nodemailer"));

var handlebars = _interopRequireWildcard(require("handlebars"));

var fs = _interopRequireWildcard(require("fs"));

var _dec, _dec2, _dec3, _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class SESMailProvider {
  constructor() {
    this.client = void 0;
    this.client = nodemailer.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    //vai ler o arquivo e transformar em string utf-8
    const templateFileContent = fs.readFileSync(path).toString("utf-8"); //fazer a leitrura do arquivo para o handlebars entender

    const templateParse = handlebars.compile(templateFileContent); //vai passar as variaveis para o template

    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      to,
      from: "",
      //inserir email já verificado pela aws
      subject,
      html: templateHTML
    });
  }

}) || _class) || _class) || _class);
exports.SESMailProvider = SESMailProvider;