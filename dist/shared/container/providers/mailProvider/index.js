"use strict";

var _tsyringe = require("tsyringe");

require("dotenv/config");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

var _SESMailProvider = require("./implementations/SESMailProvider");

const mailProvider = {
  //se a var global for
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  //vai usar o ethereal
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider) //vai usar o SES

};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER] //se a var global for 
);