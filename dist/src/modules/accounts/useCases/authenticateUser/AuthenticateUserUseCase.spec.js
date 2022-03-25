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
const AppError_1 = require("@shared/errors/AppError");
const UserRepositoryInMemory_1 = require("@modules/accounts/repositories/In-memory/UserRepositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");
let authenticateUserUseCase;
let usersRepositoryImMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryImMemory = new UserRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryImMemory, usersTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryImMemory);
    });
    it("Shoud be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "3400321",
            email: "tes@te.com",
            name: "jamelao",
            password: "123"
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty("token");
    }));
    it("Shoud not be able to authenticate a non-existent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "123"
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorret"));
    }));
    it("Should not be able to authenticate with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "3400323",
            email: "tes@te1.com",
            name: "jamelao1",
            password: "123"
        };
        yield createUserUseCase.execute(user);
        yield expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "Incorrect password"
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorret"));
    }));
});
