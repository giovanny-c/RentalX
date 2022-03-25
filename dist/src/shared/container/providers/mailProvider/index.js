"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("dotenv/config"); //para as variaveis de ambiente funcionarem(se necessario)
const EtherealMailProvider_1 = require("./implementations/EtherealMailProvider");
const SESMailProvider_1 = require("./implementations/SESMailProvider");
const mailProvider = {
    //se a var global for
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.EtherealMailProvider),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.SESMailProvider) //vai usar o SES
};
tsyringe_1.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER] //se a var global for 
);
