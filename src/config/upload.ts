
const multer = require("multer")

import * as crypto from "crypto"

import { resolve } from "path"
//para fazer a referencia da pasta onde será salvo os uploads

//TODOS OS ARQUIVOS inicialmente serao salvos na pasta tmp
//ver providers/StorageProvider/implementations/** 
//que alterar o destino
//se os arquivos vao ser salvos localmente ou em um servidor

const tmpFolder = resolve(__dirname, "..", "..", "tmp")// resolve traz o caminho da pasta passada

export default { //ver providers/StorageProvider/implementations/** 

    tmpFolder,//caminho utilizado (pasta tmp na raiz)


    storage: multer.diskStorage({ //permite passar infos de destino, e recriar o filename do arquivo
        destination: tmpFolder,
        filename: (request, file, callback) => {

            const fileHash = crypto.randomBytes(16).toString("hex") //vai criar um hash, para nao ter arquivos com nomes duplicados

            const fileName = `${fileHash}-${file.originalname}` //vai juntar o hash com o nome original do arquivo

            return callback(null, fileName)//retorna o erro(1) e o nome do arquivo(2)

        } //é uma funçao que vai reescrever o nome do arquivo
    })


}