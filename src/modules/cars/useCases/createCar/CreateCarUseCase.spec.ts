import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"

import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create car", () => {

    beforeEach(() => {

        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"

        })

        expect(car).toHaveProperty("id")
    })


    it("should not be able to create a car with existent license plate", async () => {
        await createCarUseCase.execute({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"

        })

        await expect(
            createCarUseCase.execute({
                name: "911 Carrera 4S",
                description: "992 generation of 911",
                daily_rate: 300,
                license_plate: "FSW-3530",
                fine_amount: 150,
                brand: "Porsche",
                category_id: "Sport Car"

            })

        ).rejects.toEqual(new AppError("Car already exists"))
    })

    it("should be able to create a car with availability by default", async () => {

        const car = await createCarUseCase.execute({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "GCS-3575",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car"

        })

        expect(car.available).toBe(true)




    })


})