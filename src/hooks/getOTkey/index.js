import getOtKey from "../../db/getOtKey";
import createNewDate from "../createNewDay";

async function getOTkey(propDate = createNewDate()) {
    const otCount = await getOtKey(propDate)
    const date = new formatDay(new Date(propDate));

    if (otCount >= 9) {
        date.addDay()
        const newDayCount = await getOtKey(date.getNumber())
        return `${date.getFullFormat()}${Number(newDayCount) + 1}`
    }
    return `${date.getFullFormat()}${otCount + 1}`;
}

class formatDay {
    constructor(newDate) {
        this.date = newDate
    }

    addDay() {
        let diaActual = this.date.getDate();
        let nuevoDia = diaActual + 1;
        this.date.setDate(nuevoDia);
    }
    getDay() {
        return ("0" + this.date.getDate()).slice(-2);
    }
    getMonth() {
        return ("0" + (this.date.getMonth() + 1)).slice(-2);
    }
    getYear() {
        return String(this.date.getFullYear()).slice(2, 4)
    }
    getFullFormat() {
        return `${this.getYear()}${this.getMonth()}${this.getDay()}`
    }
    getNumber() {
        return this.date.getTime()
    }
}


export default getOTkey;