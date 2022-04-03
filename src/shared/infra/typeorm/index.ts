import { Connection, createConnection, getConnectionOptions } from "typeorm"


export default async (/*host = "database_ignite"*/): Promise<Connection> => { //host = nome do serviço do bd no docker-compose.yml
    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            //host: process.env.NODE_ENV === "test" ? "localhost" : host,
            database: process.env.NODE_ENV === "test" ? "rentalx_test" : defaultOptions.database // se NODE_ENV for === test usa o banco de teste, se nao usa o padrao

        })
    )
}

/*
    Se for rodar o app localmente - host = "localhost" (como parametro da func)

    REMOVER QUANDO COLOCAR EM PRODUÇÃO,
    ESSAS OPÇOES SAO SO PARA QUANDO FOR USAR O DOCKER-COMPOSE

    - host = "database_ignite" (como parametro da func )

    - host: process.env.NODE_ENV === "test" ? "localhost" : host,
*/

//ver no package.json
//"test": "set NODE_ENV=test & jest" ou (nao funcionou)
//"test": "NODE_ENV=test & jest" ou (funcionou)
//"cross-env NODE_ENV=test&&jest --runInBand --detectOpenHandles"
//yarn add cross-env -D


//jeito antigo

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

//  