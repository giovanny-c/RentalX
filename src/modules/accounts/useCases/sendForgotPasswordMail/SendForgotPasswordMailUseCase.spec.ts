import { UsersRepositoryInMemory } from "@modules/accounts/repositories/In-memory/UserRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/In-Memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryImMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send forgot password mail", () => {

    beforeEach(() => {
        usersRepositoryImMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider)
    })

    it("Should be able to send a forgot password mail to user", async () => {

        const sendMail = jest.spyOn(mailProvider, "sendMail")//funcao do proprio jest que fica "de olho numa funçao"

        await usersRepositoryImMemory.create({
            driver_license: "325462",
            email: "test@test.com",
            name: "Test test",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("test@test.com")

        expect(sendMail).toHaveBeenCalled()


    })

    it("Should not be able to send a email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("sadsa@efe")
        ).rejects.toEqual(new AppError("User does not exists!"))
    }),

        it("Should be able to create an users token", async () => {
            const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

            await usersRepositoryImMemory.create({
                driver_license: "3254332",
                email: "test1@test.com",
                name: "Te1st test",
                password: "12d34"
            })

            await sendForgotPasswordMailUseCase.execute("test1@test.com")

            expect(generateTokenMail).toBeCalled()
        })
})