
interface IMailProvider {

    sendMail(to: string, subject, body: string): Promise<void>

}

export { IMailProvider }