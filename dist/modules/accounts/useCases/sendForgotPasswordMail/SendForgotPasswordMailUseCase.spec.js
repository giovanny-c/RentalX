"use strict";

var _UserRepositoryInMemory = require("@modules/accounts/repositories/In-memory/UserRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/mailProvider/In-Memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryImMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot password mail", () => {
  beforeEach(() => {
    usersRepositoryImMemory = new _UserRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail"); //funcao do proprio jest que fica "de olho numa funçao"

    await usersRepositoryImMemory.create({
      driver_license: "325462",
      email: "test@test.com",
      name: "Test test",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("test@test.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send a email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("sadsa@efe")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  }), it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryImMemory.create({
      driver_license: "3254332",
      email: "test1@test.com",
      name: "Te1st test",
      password: "12d34"
    });
    await sendForgotPasswordMailUseCase.execute("test1@test.com");
    expect(generateTokenMail).toBeCalled();
  });
});