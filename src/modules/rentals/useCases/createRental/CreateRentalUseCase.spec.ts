import { RentalsRepositoryImMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryImMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"
import *  as dayjs from "dayjs"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryImMemory
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {

    const date = dayjs().add(1, "day").toDate() //adiciona um dia a data atual

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryImMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
    })

    it("Shoud be able to create a new rental for a car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "test",
            daily_rate: 100,
            license_plate: "32244000",
            fine_amount: 40,
            category_id: "1234",
            brand: "Test"
        })

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: date
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("Shoud not be able to create a new rental if there is another open to the same user", async () => {

        const car = await rentalsRepositoryInMemory.create({
            car_id: "21323",
            expected_return_date: date,
            user_id: "12345"
        })

        await expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "122323s",
            expected_return_date: date
        })
        ).rejects.toEqual(new AppError("There is already a rental in progress for this user"))



    })



    it("Shoud not be able to create a new rental if there is another open to the same car", async () => {


        const car = await rentalsRepositoryInMemory.create({
            car_id: "21323",
            expected_return_date: date,
            user_id: "123345"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "123345",
                car_id: "21323",
                expected_return_date: date
            })
        ).rejects.toEqual(new AppError("This car is not available for rent right now"))



    })

    it("Shoud not be able to create a new rental with invalid return time (less than 24h)", async () => {

        await expect(
            createRentalUseCase.execute({
                user_id: "123245",
                car_id: "121212",
                expected_return_date: dayjs().toDate()
            })


        ).rejects.toEqual(new AppError("The rent should be longer than 1 day (24 hours)"))



    })

})