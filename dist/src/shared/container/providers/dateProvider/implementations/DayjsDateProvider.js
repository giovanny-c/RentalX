"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
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
        return dayjs().add(days, "days").toDate();
    }
    addHours(hours) {
        return dayjs().add(hours, "hours").toDate();
    }
    compareIfBefore(start_date, end_date) {
        return dayjs(start_date).isBefore(end_date);
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
