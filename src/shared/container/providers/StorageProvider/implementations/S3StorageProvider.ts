import upload from "@config/upload";

import { S3 } from "aws-sdk"

import { resolve } from "path"

import * as fs from "fs"

import * as mime from "mime"

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
    private client: S3

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        })
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file) //local do arquivo , arquivo

        const bucketName = `${process.env.AWS_BUCKET}/${folder}`

        const fileContent = await fs.promises.readFile(originalName) // pega o conteudo desse arquivo

        const ContentType = mime.getType(originalName)

        await this.client.putObject({
            Bucket: bucketName, //vai por no bucket da aws no folder passado
            Key: file, //tipo do objeto que vai ser salvo
            ACL: "public-read", //tipos de permissao
            Body: fileContent, // conteudo do arquivo
            ContentType //tipo do arquivo (png, jpg, ...etc)
        }).promise()//transforma em promise

        await fs.promises.unlink(originalName)//retira ele da pasta tmp

        return file
    }
    async delete(file: string, folder: string): Promise<void> {

        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`, //vai por no bucket da aws no folder passado
            Key: file, //tipo do objeto que vai ser salvo
        }).promise()
    }

}

export { S3StorageProvider }