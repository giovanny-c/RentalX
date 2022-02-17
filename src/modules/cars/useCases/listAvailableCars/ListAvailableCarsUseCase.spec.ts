import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)


    })

    it("Should be able to list all avilable cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "911 Carrera Cabriolet",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "FSW-9930",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })



        const cars = await listCarsUseCase.execute({})


        expect(cars).toEqual([car])
    })


    it("Shound be able to list all available cars by brand", async () => {

        await carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })


        const car = await carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })


        const cars = await listCarsUseCase.execute({
            brand: "BMW"
        })



        expect(cars).toEqual([car])
    })

    it("Shound be able to list all available cars by name", async () => {

        await carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })


        const car = await carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })


        const cars = await listCarsUseCase.execute({
            name: "M3"
        })



        expect(cars).toEqual([car])
    })

    it("Shound be able to list all available cars by category", async () => {

        await carsRepositoryInMemory.create({
            name: "911 Carrera 4S",
            description: "992 generation of 911",
            daily_rate: 300,
            license_plate: "HJW-1230",
            fine_amount: 150,
            brand: "Porsche",
            category_id: "c76b0103-6e17-44fb-8616-9a9d93560306"
        })


        const car = await carsRepositoryInMemory.create({
            name: "M3",
            description: "Geração E35",
            daily_rate: 280,
            license_plate: "GZQ-9210",
            fine_amount: 140,
            brand: "BMW",
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })


        const cars = await listCarsUseCase.execute({
            category_id: "c66b0103-6e17-44fb-8616-9a9d93560306"
        })



        expect(cars).toEqual([car])
    })
})