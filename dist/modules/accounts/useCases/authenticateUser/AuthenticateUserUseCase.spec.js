"use strict";

var _AppError = require("@shared/errors/AppError");

var _UserRepositoryInMemory = require("@modules/accounts/repositories/In-memory/UserRepositoryInMemory");

var _CreateUserUseCase = require("@modules/accounts/useCases/createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");

let authenticateUserUseCase;
let usersRepositoryImMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryImMemory = new _UserRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryImMemory);
  });
  it("Shoud be able to authenticate an user", async () => {
    const user = {
      driver_license: "3400321",
      email: "tes@te.com",
      name: "jamelao",
      password: "123"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Shoud not be able to authenticate a non-existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "123"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorret"));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "3400323",
      email: "tes@te1.com",
      name: "jamelao1",
      password: "123"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "Incorrect password"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorret"));
  });
});