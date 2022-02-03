import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

import { v4 as uuidV4 } from "uuid"


@Entity("users")
class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    driver_license: string

    @Column()
    isAdmin: boolean

    @CreateDateColumn()
    created_at: Date

    @Column()
    avatar: string


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { User }