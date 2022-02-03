import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user //pega o user passado pelo middleware

        //Receber arquivo
        const avatar_file = req.file.filename // pega só o nome do arquivo pra por no banco

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file })

        return res.status(204).send()
    }
}

export { UpdateUserAvatarController }