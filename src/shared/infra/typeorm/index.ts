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
export default async (host = "database_ignite"): Promise<Connection> => { //precisa ser desse jeito para passa a conexao pro seed/admin
    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : host,
            database: process.env.NODE_ENV === "test" ? "rentalx_test" : defaultOptions.database // se NODE_ENV for === test usa o banco de teste, se nao usa o padrao
            //ver no package.json
        })
    )
}
