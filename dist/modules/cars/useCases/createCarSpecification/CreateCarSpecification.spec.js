"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let specificationRepositoryImMemory;
let carsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationRepositoryImMemory = new _SpecificationRepositoryInMemory.SpecificationRepositoryImMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryImMemory);
  });
  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "911 Carrera S",
      description: "992 generation of 911",
      daily_rate: 300,
      license_plate: "FSW-3530",
      fine_amount: 150,
      brand: "Porsche",
      category_id: "Sport Car"
    });
    const specification = await specificationRepositoryImMemory.create({
      name: "test",
      description: "..."
    });
    const specifications_ids = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids
    });
    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
  it("Should not be able to add a specification to a car that does not exists", async () => {
    const car_id = "1234";
    const specifications_ids = ["54321"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_ids
    })).rejects.toEqual(new _AppError.AppError("Car does not exists!"));
  });
});