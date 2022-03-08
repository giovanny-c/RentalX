import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryImMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase

let specificationRepositoryImMemory: SpecificationRepositoryImMemory
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryImMemory = new SpecificationRepositoryImMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryImMemory)
    })

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "911 Carrera S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-3530",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "Sport Car",

        })

        const specification = await specificationRepositoryImMemory.create({
            name: "test",
            description: "..."
        })


        const specifications_ids = [specification.id]

        const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_ids })

        expect(specificationCars).toHaveProperty("specifications")
        expect(specificationCars.specifications.length).toBe(1)
    })

    it("Should not be able to add a specification to a car that does not exists", async () => {
        const car_id = "1234"
        const specifications_ids = ["54321"]
        await expect(
            createCarSpecificationUseCase.execute({ car_id, specifications_ids })

        ).rejects.toEqual(new AppError("Car does not exists!"))
    })

})