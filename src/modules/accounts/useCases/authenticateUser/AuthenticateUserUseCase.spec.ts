import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/In-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase

let usersRepositoryImMemory: UsersRepositoryInMemory

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory

let dateProvider: DayjsDateProvider

let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryImMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider)
        createUserUseCase = new CreateUserUseCase(usersRepositoryImMemory)
    })

    it("Shoud be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_license: "3400321",
            email: "tes@te.com",
            name: "jamelao",
            password: "123"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("Shoud not be able to authenticate a non-existent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "123"
            })

        ).rejects.toEqual(new AppError("Email or password incorret"))

    })

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "3400323",
            email: "tes@te1.com",
            name: "jamelao1",
            password: "123"
        }

        await createUserUseCase.execute(user)

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "Incorrect password"
            })
        ).rejects.toEqual(new AppError("Email or password incorret"))
    })



})