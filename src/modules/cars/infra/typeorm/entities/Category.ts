import { v4 as uuidV4 } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("categories") // definindo que essa classe vai ser um entidade para a table categorie
class Category {

    @PrimaryColumn() //definindo o atributo id como chave primaria 
    id?: string // atributo opcional 
    //(como o nome do atributo é o mesmo da coluna nao precisa passar ele ex @Column("nome da coluna"))

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()//pra colunas de created_at e updated_at
    created_at: Date

    constructor() { //cria o id se ele nao existir
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}

export { Category }