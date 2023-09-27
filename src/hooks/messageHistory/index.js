class messageHistory {
    static tittleEditAvailability = "Se modifico la disponibilidad";
    static tittleEditActivities = "Se editaron las actividades";
    static tittleEditaAuth = "Se modifico la autorizacion";
    static tittleEditPay = "Se modificaron las facturas";
    static tittleEditUser = "Se edito la actividad";
    static tittleEditOT = "Se modificaron valores";
    static editUsersActivity(nameActivity, users) {
        try {
            return `${firstLetterUpperCase(nameActivity)} usuarios ${users}`
        } catch (error) {
            console.log(error)
        }
    }
    static editAvailability(availability) {
        try {
            return availability ? `Se cambio la disponibilidad a ${firstLetterUpperCase(availability.type)}`
                : `Se elimino la disponibilidad`
        } catch (error) {
            console.log(error)
        }
    }
    static editActivity(newActivities, activities) {
        try {
            const added = getDifference(newActivities, activities);
            const eliminated = getDifference(activities, newActivities);
            const addedText = added.length > 0 && `Se agregó ${added.map(activity => activity.name).join(", ")}`;
            const eliminatedText = eliminated.length > 0 && `Se eliminó ${eliminated.map(activity => activity.name).join(", ")}`;
            const comment = (addedText && eliminatedText) ? addedText + " y " + eliminatedText : addedText || eliminatedText;
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