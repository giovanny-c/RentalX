import { IDateProvider } from "../IDateProvider";


const dayjs = require("dayjs")//se nao funcionar usar import * as

const utc = require("dayjs/plugin/utc")//se nao funcionar usar import * as

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {


    dateNow(): Date {
        return dayjs().toDate()//retorna a data atual
    }

    convertToUTC(date: Date): string {
        //dayjs(date).format()                

        return dayjs(date).utc().local().format()
    }

    compareDiferenceInHours(start_date: Date, end_date: Date): number {

        const start_date_utc = this.convertToUTC(start_date)

        const end_date_utc = this.convertToUTC(end_date)

        return dayjs(end_date_utc).diff(start_date_utc, "hours") //faz a comparaçao
    }

    compareInDays(first_date: Date, second_date: Date): number {
        //quantos dias de diferença tem entra a primeira data e a segunda
        const first_date_utc = this.convertToUTC(first_date)

        const second_date_utc = this.convertToUTC(second_date)

        return dayjs(second_date_utc).diff(first_date_utc, "days")
    }

    addDays(days: number): Date {//adiciona x dias a uma data
        return dayjs().add(days, "days").toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate()
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean { //se adata passada é antes da data final
        return dayjs(start_date).isBefore(end_date)
    }
}

export { DayjsDateProvider }