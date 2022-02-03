
declare namespace Express {

    export interface Request {
        //o request vai ser sobreescrito
        //fala que a interface request
        //tem um objeto user com a prop id
        user: {
            id: string
        }
    }
}