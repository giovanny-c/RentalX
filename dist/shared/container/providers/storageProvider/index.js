"use strict";

var _tsyringe = require("tsyringe");

require("dotenv/config");

var _S3StorageProvider = require("./implementations/S3StorageProvider");

var _localStorageProvider = require("./implementations/localStorageProvider");

const diskStorage = {
  local: _localStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.disk] // se a variavel global for = local, usa o armazenamento local, se for = s3 usa o armz. da aws
);