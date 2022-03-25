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
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepositoryInMemory);
    });
    it("should be able to create a new car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"
        });
        expect(car).toHaveProperty("id");
    }));
    it("should not be able to create a car with existent license plate", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCarUseCase.execute({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"
        });
        yield expect(createCarUseCase.execute({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"
        })).rejects.toEqual(new AppError_1.AppError("Car already exists"));
    }));
    it("should be able to create a car with availability by default", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "GCS-3575",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"
        });
        expect(car.available).toBe(true);
    }));
});
