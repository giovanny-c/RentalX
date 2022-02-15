import { Connection, createConnection, getConnectionOptions } from "typeorm"

// interface IOptions {
//     host: string
// }

// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions
//     newOptions.host = 'database_ignite'//Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados no docker (nome do container)

//     createConnection({
//         ...options,
//     })
// })

//                           database_ignite ?
export default async (host = "database"): Promise<Connection> => { //precisa ser desse jeito para passa a conexao pro seed/admin
    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            host
        })
    )
}
