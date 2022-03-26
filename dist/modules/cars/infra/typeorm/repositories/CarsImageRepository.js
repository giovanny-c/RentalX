"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../entities/CarImage");

class CarsImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }

  async findImageByCarId(car_id) {
    const carImages = await this.repository.find({
      car_id
    });
    return carImages;
  }

  async DeleteImageByCarId(car_id) {
    await this.repository.createQueryBuilder().delete().from("cars_image").where("car_id = :car_id", {
      car_id
    }).execute();
  }

}

exports.CarsImagesRepository = CarsImagesRepository;