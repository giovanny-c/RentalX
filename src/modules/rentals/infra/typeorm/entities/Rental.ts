import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("rentals")
class Rental {

    @PrimaryColumn()
    id: string

    //faz a relação para poder trazer a entidade car quando puxar o rental
    @ManyToOne(() => Car)//um carro para varios alugueis
    @JoinColumn({ name: "car_id" })//pela referancia rentals.car_id
    car: Car //nome do relacionamento (car), quando for chamdo fara a relaçao

    @Column()
    car_id: string

    @Column()
    user_id: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column()
    expected_return_date: Date

    @Column()
    total: Number

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()

        }
    }
}

export { Rental }