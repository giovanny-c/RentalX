import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm"
import { Expose } from "class-transformer"
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
    is_admin: boolean

    @CreateDateColumn()
    created_at: Date

    @Column()
    avatar: string

    @Expose({ name: "avatar_url" }) //Expose do class-transformer
    //quando a propriedade "avatar_url" aparecer 
    //na respota de uma requisição (?so req de user?)
    avatar_url(): string { //vai executar essa funç
        switch (process.env.disk) { //se a variavel global de armazenamento for:
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`
            //vai exibir o link para a imagem de avatar 
            //pelo link do storage local do app
            //ver app.ts
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
            //vai exibir o link a img
            //pelolink do storage do app na aws
            default:
                return null
        }
    }


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { User }