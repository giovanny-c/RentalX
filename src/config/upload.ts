
import crypto from "crypto"
import multer from "multer"


import { resolve } from "path"
//para fazer a referencia da pasta onde será salvo os uploads

export default {

    upload(folder: string) {//quando mandar o nome da a pasta de destino
        return {//vai retornar o caminho dessa pasta + o nome do arquivo

            storage: multer.diskStorage({ //permite passar infos de destino, e recriar o filename do arquivo
                destination: resolve(__dirname, "..", "..", folder),// para ir até a raiz do projeto(src) e passar o folder (ex: ../../tmp/avatars)
                filename: (request, file, callback) => {

                    const fileHash = crypto.randomBytes(16).toString("hex") //vai criar um hash, para nao ter arquivos com nomes duplicados

                    const fileName = `${fileHash}-${file.originalname}` //vai juntar o hash com o nome original do arquivo

                    return callback(null, fileName)//retorna o erro(1) e o nome do arquivo(2)

                } //é uma funçao que vai reescrever o nome do arquivo
            })
        }
    }
}