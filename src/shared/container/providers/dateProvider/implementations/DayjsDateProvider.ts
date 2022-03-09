import { IDateProvider } from "../IDateProvider";


import * as dayjs from "dayjs"

import * as utc from "dayjs/plugin/utc"

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {

    dateNow(): Date {
        return dayjs().toDate()//retorna a data atual
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format()
    }

    compareDiferenceInHours(start_date: Date, end_date: Date): number {

        const start_date_utc = this.convertToUTC(start_date)

        const end_date_utc = this.convertToUTC(end_date)

        return dayjs(end_date_utc).diff(start_date_utc, "hours") //faz a comparaçao
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUTC(start_date)

        const end_date_utc = this.convertToUTC(end_date)

        return dayjs(end_date_utc).diff(start_date_utc, "days")
    }

    addDays(days: number): Date {//adiciona x dias a uma data
        return dayjs().add(days, "days").toDate()
    }
}

export { DayjsDateProvider }