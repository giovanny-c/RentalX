import { RentalsRepositoryImMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryImMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import *  as dayjs from "dayjs"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryImMemory

describe("Create Rental", () => {

    const date = dayjs().add(1, "day").toDate() //adiciona um dia a data atual

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryImMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
    })

    it("Shoud be able to create a new rental for a car", async () => {



        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: date
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("Shoud not be able to create a new rental if there is another open to the same user", async () => {

        expect(async () => {


            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212212",
                expected_return_date: date
            })

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212112",
                expected_return_date: date
            })
        }).rejects.toBeInstanceOf(AppError)



    })



    it("Shoud not be able to create a new rental if there is another open to the same car", async () => {

        expect(async () => {


            await createRentalUseCase.execute({
                user_id: "123245",
                car_id: "121212",
                expected_return_date: date
            })

            await createRentalUseCase.execute({
                user_id: "123345",
                car_id: "121212",
                expected_return_date: date
            })
        }).rejects.toBeInstanceOf(AppError)



    })

    it("Shoud not be able to create a new rental with invalid return time (less than 24h)", async () => {

        expect(async () => {


            await createRentalUseCase.execute({
                user_id: "123245",
                car_id: "121212",
                expected_return_date: dayjs().toDate()
            })


        }).rejects.toBeInstanceOf(AppError)



    })

})