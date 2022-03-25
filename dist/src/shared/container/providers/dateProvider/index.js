"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("dotenv/config"); //para as variaveis de ambiente funcionarem(se necessario)
const DayjsDateProvider_1 = require("./implementations/DayjsDateProvider");
tsyringe_1.container.registerSingleton("DayjsDateProvider", DayjsDateProvider_1.DayjsDateProvider);
