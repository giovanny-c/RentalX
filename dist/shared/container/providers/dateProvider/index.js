"use strict";

var _tsyringe = require("tsyringe");

require("dotenv/config");

var _DayjsDateProvider = require("./implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton("DayjsDateProvider", _DayjsDateProvider.DayjsDateProvider);