

export class AppError {
    public readonly message: string

    public readonly statusCode: number

    constructor(message: string, statusCode = 400) {
        this.message = message
        this.statusCode = statusCode
    }//se nao for passado nenhum status Code o default vai ser 400
}