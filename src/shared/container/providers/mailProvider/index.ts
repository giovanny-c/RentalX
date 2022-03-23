
import { container } from "tsyringe";


import "dotenv/config" //para as variaveis de ambiente funcionarem(se necessario)

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
    //se a var global for
    ethereal: container.resolve(EtherealMailProvider),//vai usar o ethereal
    ses: container.resolve(SESMailProvider)//vai usar o SES
}
container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]//se a var global for 
)