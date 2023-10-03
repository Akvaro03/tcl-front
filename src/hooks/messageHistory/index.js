class messageHistory {
    static tittleEditAvailability = "Modificaicón en disponibilidad de producto";
    static tittleEditActivities = "Se editaron las actividades";
    static tittleEditaAuth = "Se modificó la autorización";
    static tittleEditPay = "Se modificó la facturación";
    static tittleEditUser = "Se editó una actividad";
    static tittleEditOT = "Se modificaron valores";
    static editUsersActivity(nameActivity, users) {
        try {
            return `Actividad: ${firstLetterUpperCase(nameActivity)} - Usuario/s: ${users}`
        } catch (error) {
            console.log(error)
        }
    }
    static editAvailability(availability) {
        try {
            return availability ? `Se modificó la disponibilidad del producto a "${firstLetterUpperCase(availability.type)}"`
                                : `Se eliminó el registro de disponibilidad del producto`
        } catch (error) {
            console.log(error)
        }
    }
    static editActivity(newActivities, activities) {
        try {
            const added = getDifference(newActivities, activities);
            const eliminated = getDifference(activities, newActivities);
            const addedText = added.length > 0 && `Se agregó ${added.map(activity => activity.name).join(", ")}`;
            const eliminatedText = eliminated.length > 0 && `se eliminó ${eliminated.map(activity => activity.name).join(", ")}`;
            const comment = (addedText && eliminatedText) ? addedText + " y " + eliminatedText
                                                          : addedText || eliminatedText.charAt(0).toUpperCase() + eliminatedText.slice(1);
            return comment;
        } catch (error) {
            console.log(error)
        }
    }
    static editPay(pay) {
        console.log(pay)
        return `${!pay.delete ? "Nueva factura" : `Se elimino`}: ${pay.delete ? pay.delete : pay.id}`
    }
}
const firstLetterUpperCase = (word) => {
    const arr = word.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    return arr.join(" ");
}
function getDifference(a, b) {
    return a.filter(element => {
        return !b.includes(element);
    });
}

export default messageHistory;