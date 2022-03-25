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
exports.ListAvailableCarsControler = void 0;
const tsyringe_1 = require("tsyringe");
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
class ListAvailableCarsControler {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand, name, category_id } = req.query;
            const listAvailableCarsUsecase = tsyringe_1.container.resolve(ListAvailableCarsUseCase_1.ListAvailableCarsUseCase);
            const cars = yield listAvailableCarsUsecase.execute({
                brand: brand,
                name: name,
                category_id: category_id
            });
            return res.json(cars);
        });
    }
}
exports.ListAvailableCarsControler = ListAvailableCarsControler;
