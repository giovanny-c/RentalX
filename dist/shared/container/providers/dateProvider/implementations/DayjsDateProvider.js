"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;

var dayjs = _interopRequireWildcard(require("dayjs"));

var utc = _interopRequireWildcard(require("dayjs/plugin/utc"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dayjs.extend(utc);

class DayjsDateProvider {
  dateNow() {
    return dayjs().toDate(); //retorna a data atual
  }

  convertToUTC(date) {
    return dayjs(date).utc().local().format();
  }

  compareDiferenceInHours(start_date, end_date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours"); //faz a comparaçao
  }

  compareInDays(start_date, end_date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  addDays(days) {
    //adiciona x dias a uma data
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours) {
    return dayjs().add(hours, "hours").toDate();
  }

  compareIfBefore(start_date, end_date) {
    //se adata passada é antes da data final
    return dayjs(start_date).isBefore(end_date);
  }

}

exports.DayjsDateProvider = DayjsDateProvider;