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
const SpecificationRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let specificationRepositoryImMemory;
let carsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationRepositoryImMemory = new SpecificationRepositoryInMemory_1.SpecificationRepositoryImMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryImMemory);
    });
    it("Should be able to add a new specification to the car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car",
        });
        const specification = yield specificationRepositoryImMemory.create({
            name: "test",
            description: "..."
        });
        const specifications_ids = [specification.id];
        const specificationCars = yield createCarSpecificationUseCase.execute({ car_id: car.id, specifications_ids });
        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    }));
    it("Should not be able to add a specification to a car that does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = "1234";
        const specifications_ids = ["54321"];
        yield expect(createCarSpecificationUseCase.execute({ car_id, specifications_ids })).rejects.toEqual(new AppError_1.AppError("Car does not exists!"));
    }));
});
