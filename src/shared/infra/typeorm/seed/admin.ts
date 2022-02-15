
import { v4 as uuidV4 } from "uuid"

import { hash } from "bcryptjs"

import createConnection from "../index"

async function create() {
    const connection = await createConnection("localhost")

    const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
        VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`
    )

    //await (se der erro)
    connection.close
}


create().then(() => console.log("User admin created!"))