"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "911 Carrera S",
      description: "992 generation of 911",
      daily_rate: 300,
      license_plate: "FSW-3530",
      fine_amount: 150,
      brand: "Porsche",
      category_id: "Sport Car"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with existent license plate", async () => {
    await createCarUseCase.execute({
      name: "911 Carrera S",
      description: "992 generation of 911",
      daily_rate: 300,
      license_plate: "FSW-3530",
      fine_amount: 150,
      brand: "Porsche",
      category_id: "Sport Car"
    });
    await expect(createCarUseCase.execute({
      name: "911 Carrera 4S",
      description: "992 generation of 911",
      daily_rate: 300,
      license_plate: "FSW-3530",
      fine_amount: 150,
      brand: "Porsche",
      category_id: "Sport Car"
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("should be able to create a car with availability by default", async () => {
    const car = await createCarUseCase.execute({
      name: "911 Carrera 4S",
      description: "992 generation of 911",
      daily_rate: 300,
      license_plate: "GCS-3575",
      fine_amount: 150,
      brand: "Porsche",
      category_id: "Sport Car"
    });
    expect(car.available).toBe(true);
  });
});