import { injectable } from "tsyringe";
import { SES } from "aws-sdk"
import * as nodemailer from "nodemailer"
import { Transporter } from "nodemailer";
import { IMailProvider } from "../IMailProvider";

import * as handlebars from "handlebars"
import * as fs from "fs"

@injectable()
class SESMailProvider implements IMailProvider {

    private client: Transporter

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION
            })
        })
    }

    async sendMail(to: string, subject: any, variables: any, path: string): Promise<void> {

        //vai ler o arquivo e transformar em string utf-8
        const templateFileContent = fs.readFileSync(path).toString("utf-8")

        //fazer a leitrura do arquivo para o handlebars entender
        const templateParse = handlebars.compile(templateFileContent)

        //vai passar as variaveis para o template
        const templateHTML = templateParse(variables)

        await this.client.sendMail({
            to,
            from: "", //inserir email já verificado pela aws
            subject,
            html: templateHTML
        })


    }


}
export { SESMailProvider } 