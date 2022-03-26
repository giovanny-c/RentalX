"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = require("@modules/cars/useCases/createCar/CreateCarController");

var _ListAvailableCarsController = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _CreateCarSpecificationController = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _UploadCarImagesController = require("@modules/cars/useCases/uploadCarImages/UploadCarImagesController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multer = require("multer");

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsControler = new _ListAvailableCarsController.ListAvailableCarsControler();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImagesController = new _UploadCarImagesController.UploadCarImagesController();
const upload = multer(_upload.default); // passando a pasta, ver src/config/upload.ts

carsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsControler.handle);
carsRoutes.post("/specifications/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);