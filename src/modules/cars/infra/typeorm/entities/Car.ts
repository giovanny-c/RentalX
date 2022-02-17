import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { Category } from "./Category"
import { Specification } from "./Specification"

@Entity("cars")
class Car {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    daily_rate: number

    @Column()
    available: boolean

    @Column()
    license_plate: string

    @Column()
    fine_amount: number

    @Column()
    brand: string

    @ManyToOne(() => Category)//muitos carros para uma categoria
    @JoinColumn({ name: "category_id" }) //para relacionar o cat_id à tabela categoria
    category: Category

    @Column()
    category_id: string

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => Specification)//muitas especificaçoes para muitos carros
    @JoinTable({
        name: "specifications_cars", //junta a tabela (de relacionamentos)
        joinColumns: [{ name: "car_id" }],// (faz referencia a tabela cars)
        inverseJoinColumns: [{ name: "specification_id" }]//(faz referencia a tabela specifications)
    })
    specifications: Specification[]
    //muitos para muito (para tabelas de relacionamentos sempre many to many)


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
            this.available = true

        }
    }
}

export { Car }