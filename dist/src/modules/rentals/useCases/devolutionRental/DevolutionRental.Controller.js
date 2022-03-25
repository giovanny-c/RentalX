"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevolutionRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const DevolutionRentalUseCase_1 = require("./DevolutionRentalUseCase");
class DevolutionRentalController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.user;
            const { id: rent_id } = req.params;
            const devolutionRentalUseCase = tsyringe_1.container.resolve(DevolutionRentalUseCase_1.DevolutionRentalUseCase);
            const rental = yield devolutionRentalUseCase.execute({
                rent_id,
                user_id
            });
            return res.status(200).json(rental);
        });
    }
}
exports.DevolutionRentalController = DevolutionRentalController;
