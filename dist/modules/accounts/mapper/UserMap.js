"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  //vai receber esse parametro do user e retornar eles como um IUserResponseDTO
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  }) {
    //o instanceToInstance vai dar o expose na func avatar_url (pela propriedade "avatar_url") 
    //quando a resposta de user for criada
    const user = (0, _classTransformer.instanceToInstance)({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;