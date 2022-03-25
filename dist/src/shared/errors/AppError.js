"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    } //se nao for passado nenhum status Code o default vai ser 400
}
exports.AppError = AppError;