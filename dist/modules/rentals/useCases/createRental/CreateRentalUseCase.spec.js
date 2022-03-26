"use strict";

var _RentalsRepositoryImMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryImMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _DayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/DayjsDateProvider");

var dayjs = _interopRequireWildcard(require("dayjs"));

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const date = dayjs().add(1, "day").toDate(); //adiciona um dia a data atual

  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryImMemory.RentalsRepositoryImMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("Shoud be able to create a new rental for a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test",
      daily_rate: 100,
      license_plate: "32244000",
      fine_amount: 40,
      category_id: "1234",
      brand: "Test"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: date
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Shoud not be able to create a new rental if there is another open to the same user", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "21323",
      expected_return_date: date,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "122323s",
      expected_return_date: date
    })).rejects.toEqual(new _AppError.AppError("There is already a rental in progress for this user"));
  });
  it("Shoud not be able to create a new rental if there is another open to the same car", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "21323",
      expected_return_date: date,
      user_id: "123345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "123345",
      car_id: "21323",
      expected_return_date: date
    })).rejects.toEqual(new _AppError.AppError("This car is not available for rent right now"));
  });
  it("Shoud not be able to create a new rental with invalid return time (less than 24h)", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123245",
      car_id: "121212",
      expected_return_date: dayjs().toDate()
    })).rejects.toEqual(new _AppError.AppError("The rent should be longer than 1 day (24 hours)"));
  });
});