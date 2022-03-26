"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsImagesRepository = require("@modules/cars/repositories/ICarsImagesRepository");

var _IStorageProvider = require("@shared/container/providers/storageProvider/IStorageProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UploadCarImagesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsImageRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsImagesRepository.ICarsImageRepository === "undefined" ? Object : _ICarsImagesRepository.ICarsImageRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImagesUseCase {
  constructor(carsImageRepository, storageProvider) {
    this.carsImageRepository = carsImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    car_id,
    images_name
  }) {
    const toDeleteCarImages = await this.carsImageRepository.findImageByCarId(car_id); //pega as img para passar

    await this.carsImageRepository.DeleteImageByCarId(car_id); //deleta no bd as imgs antigas

    images_name.map(async image => {
      //percorre array de images
      await this.carsImageRepository.create(car_id, image); //salva a img no banco

      await this.storageProvider.save(image, "cars"); //salva a img no storage(local ou no S3)
    });
    toDeleteCarImages.map(async image => {
      await this.storageProvider.delete(image.image_name, "cars"); //deleta a img no storage(local ou no s3)
    });
    /**/
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;