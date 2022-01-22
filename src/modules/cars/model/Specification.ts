import { v4 as uuidV4 } from "uuid";

class Specification {

    id?: string // atributo opcional
    name: string
    description: string
    created_at: Date

    constructor() { //cria o id se ele nao existir
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}

export { Specification }