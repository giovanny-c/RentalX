import { v4 as uuidV4 } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("specifications")
class Specification {

    @PrimaryColumn()
    id?: string // atributo opcional

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    constructor() { //cria o id se ele nao existir
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}

export { Specification }