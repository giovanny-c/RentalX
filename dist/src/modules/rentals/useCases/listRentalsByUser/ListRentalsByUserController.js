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
exports.ListRentalsByUseController = void 0;
const tsyringe_1 = require("tsyringe");
const ListRentalsByUserUseCase_1 = require("./ListRentalsByUserUseCase");
class ListRentalsByUseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.user;
            const listRentalsByUseUseCase = tsyringe_1.container.resolve(ListRentalsByUserUseCase_1.ListRentalsByUseUseCase);
            const rentals = yield listRentalsByUseUseCase.execute(user_id);
            return res.json(rentals);
        });
    }
}
exports.ListRentalsByUseController = ListRentalsByUseController;
