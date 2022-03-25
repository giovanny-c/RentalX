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
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
let listCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("Should be able to list all avilable cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "911 Carrera Cabriolet",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-9930",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const cars = yield listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    }));
    it("Shound be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        yield carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const car = yield carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const cars = yield listCarsUseCase.execute({
            brand: "BMW"
        });
        expect(cars).toEqual([car]);
    }));
    it("Shound be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        yield carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const car = yield carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const cars = yield listCarsUseCase.execute({
            name: "M3"
        });
        expect(cars).toEqual([car]);
    }));
    it("Shound be able to list all available cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        yield carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c76b0103-6e17-44fb-8616-9a9d93560306"
        });
        const car = yield carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        const cars = yield listCarsUseCase.execute({
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        });
        expect(cars).toEqual([car]);
    }));
});
