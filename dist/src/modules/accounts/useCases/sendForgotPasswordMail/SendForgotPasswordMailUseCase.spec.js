"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositoryInMemory_1 = require("@modules/accounts/repositories/In-memory/UserRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/mailProvider/In-Memory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryImMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot password mail", () => {
    beforeEach(() => {
        usersRepositoryImMemory = new UserRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("Should be able to send a forgot password mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProvider, "sendMail"); //funcao do proprio jest que fica "de olho numa funçao"
        yield usersRepositoryImMemory.create({
            driver_license: "325462",
            email: "test@test.com",
            name: "Test test",
            password: "1234"
        });
        yield sendForgotPasswordMailUseCase.execute("test@test.com");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("Should not be able to send a email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("sadsa@efe")).rejects.toEqual(new AppError_1.AppError("User does not exists!"));
    })),
        it("Should be able to create an users token", () => __awaiter(void 0, void 0, void 0, function* () {
            const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
            yield usersRepositoryImMemory.create({
                driver_license: "3254332",
                email: "test1@test.com",
                name: "Te1st test",
                password: "12d34"
            });
            yield sendForgotPasswordMailUseCase.execute("test1@test.com");
            expect(generateTokenMail).toBeCalled();
        }));
});
