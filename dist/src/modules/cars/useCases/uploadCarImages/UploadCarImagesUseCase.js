"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UploadCarImagesUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let UploadCarImagesUseCase = class UploadCarImagesUseCase {
    constructor(carsImageRepository, storageProvider) {
        this.carsImageRepository = carsImageRepository;
        this.storageProvider = storageProvider;
    }
    execute({ car_id, images_name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const toDeleteCarImages = yield this.carsImageRepository.findImageByCarId(car_id); //pega as img para passar
            yield this.carsImageRepository.DeleteImageByCarId(car_id); //deleta no bd as imgs antigas
            images_name.map((image) => __awaiter(this, void 0, void 0, function* () {
                yield this.carsImageRepository.create(car_id, image); //salva a img no banco
                yield this.storageProvider.save(image, "cars"); //salva a img no storage(local ou no S3)
            }));
            toDeleteCarImages.map((image) => __awaiter(this, void 0, void 0, function* () {
                yield this.storageProvider.delete(image.image_name, "cars"); //deleta a img no storage(local ou no s3)
            }));
            /**/
        });
    }
};
UploadCarImagesUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CarsImageRepository")),
    __param(1, (0, tsyringe_1.inject)("StorageProvider")),
    __metadata("design:paramtypes", [Object, Object])
], UploadCarImagesUseCase);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;
