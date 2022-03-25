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
exports.CreateCarSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
class CreateCarSpecificationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { specifications_ids } = req.body;
            const createCarSpecificationUseCase = tsyringe_1.container.resolve(CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase);
            const car = yield createCarSpecificationUseCase.execute({ car_id: id, specifications_ids });
            return res.json(car);
        });
    }
}
exports.CreateCarSpecificationController = CreateCarSpecificationController;
