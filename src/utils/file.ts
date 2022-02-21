import * as fs from "fs"

export const deleteFile = async (filename: string) => {
    // deleta um arquivo do folder
    try {
        await fs.promises.stat(filename)//verifica se um arquivo existe

    } catch {
        return // se nao existir retorna (pra nao dar erro)
    }

    await fs.promises.unlink(filename) //remove o arquivo
}