import getDataFromUrl from "../getDataFromUrl";

async function getOTkey() {
    const ot = await getDataFromUrl("/getLastOt")

    const dateOt = ot[0].OTKey.slice(0, 6)
    const countOt = ot[0].OTKey.slice(6, 7)


    const date = new formatDay(new Date());
    const newDate = `${date.getFullFormat()}`
    if ((newDate === dateOt) && countOt >= 9) {
        date.addDay()
        return `${date.getFullFormat()}1`
    } else if (newDate === dateOt) {
        return `${date.getFullFormat()}${Number(countOt) + 1}`
    } else {
        return `${date.getFullFormat()}1`
    }
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
}


export default getOTkey;