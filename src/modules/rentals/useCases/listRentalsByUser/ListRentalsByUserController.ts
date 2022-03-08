import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListRentalsByUseUseCase } from "./ListRentalsByUserUseCase";


class ListRentalsByUseController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { id: user_id } = req.user

        const listRentalsByUseUseCase = container.resolve(ListRentalsByUseUseCase)

        const rentals = await listRentalsByUseUseCase.execute(user_id)

        return res.json(rentals)
    }

}

export { ListRentalsByUseController }