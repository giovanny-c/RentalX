"use strict";

var _uuid = require("uuid");

var _bcryptjs = require("bcryptjs");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)("localhost");
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)("admin", 8);
  await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
        VALUES('${id}', 'admin', 'admim@rentalx.com.br', '2365434', '${password}', true, 'now()' )`); //await (se der erro)

  connection.close;
}

create().then(() => console.log("User admin created!"));