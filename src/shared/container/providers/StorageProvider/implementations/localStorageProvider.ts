import { resolve } from "path"
import upload from "@config/upload";
import * as fs from "fs"

import { IStorageProvider } from "../IStorageProvider";


class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        //vai mover o arquivo que foi para a 
        //pasta tmp para a pasta recebida nessa func

        await fs.promises.rename( //move o arquivo para outro destino
            resolve(upload.tmpFolder, file),//pasta do arq. + o arquivo que ele vai mover
            resolve(`${upload.tmpFolder}/${folder}`, file) //pasta para onde ele será movido + o arquivo movido
        )

        return file
    }
    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file)


        try {
            await fs.promises.stat(filename)//verifica se um arquivo existe


        } catch {
            return // se nao existir retorna (pra nao dar erro)
        }

        await fs.promises.unlink(filename) //remove o arquivo
    }


}

export { LocalStorageProvider }