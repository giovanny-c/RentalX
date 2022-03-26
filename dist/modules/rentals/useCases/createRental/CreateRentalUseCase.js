"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _IDateProvider = require("@shared/container/providers/dateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }) {
    const minRentTime = 24; //nao deve ser possivel cadastrar mais de um aluguel para o mesmo carro

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id); // se o carro nao foi entregue ainda

    if (carUnavailable) {
      //se achar um aluguel com esse carro que nao foi terminado
      throw new _AppError.AppError("This car is not available for rent right now");
    } //nao deve ser possivel cadastrar mais de um aluguel para o mesmo user


    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id); //se o usuario possuir um aluguel em andamento

    if (rentalOpenToUser) {
      //se achar um aluguel com esse user emandamento
      throw new _AppError.AppError("There is already a rental in progress for this user");
    } //o aluguel deve ter duração minima de 24h


    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareDiferenceInHours(dateNow, expected_return_date); // vai comparar as duas e trazer a diferença em horas

    if (compare < minRentTime) {
      throw new _AppError.AppError("The rent should be longer than 1 day (24 hours)");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;