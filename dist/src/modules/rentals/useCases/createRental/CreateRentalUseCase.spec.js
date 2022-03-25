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
const RentalsRepositoryImMemory_1 = require("@modules/rentals/repositories/in-memory/RentalsRepositoryImMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
const DayjsDateProvider_1 = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");
const dayjs = require("dayjs");
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
    const date = dayjs().add(1, "day").toDate(); //adiciona um dia a data atual
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryImMemory_1.RentalsRepositoryImMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider;
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });
    it("Shoud be able to create a new rental for a car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "test",
            description: "test",
            daily_rate: 100,
            license_plate: "32244000",
            fine_amount: 40,
            category_id: "1234",
            brand: "Test"
        });
        const rental = yield createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: date
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    }));
    it("Shoud not be able to create a new rental if there is another open to the same user", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield rentalsRepositoryInMemory.create({
            car_id: "21323",
            expected_return_date: date,
            user_id: "12345"
        });
        yield expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "122323s",
            expected_return_date: date
        })).rejects.toEqual(new AppError_1.AppError("There is already a rental in progress for this user"));
    }));
    it("Shoud not be able to create a new rental if there is another open to the same car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield rentalsRepositoryInMemory.create({
            car_id: "21323",
            expected_return_date: date,
            user_id: "123345"
        });
        yield expect(createRentalUseCase.execute({
            user_id: "123345",
            car_id: "21323",
            expected_return_date: date
        })).rejects.toEqual(new AppError_1.AppError("This car is not available for rent right now"));
    }));
    it("Shoud not be able to create a new rental with invalid return time (less than 24h)", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createRentalUseCase.execute({
            user_id: "123245",
            car_id: "121212",
            expected_return_date: dayjs().toDate()
        })).rejects.toEqual(new AppError_1.AppError("The rent should be longer than 1 day (24 hours)"));
    }));
});
