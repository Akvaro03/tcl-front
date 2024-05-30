function getStateOt(ot) {

    if (ot.Auth === "0") return "Sin Autorizar"
    const activities = JSON.parse(ot.Activities);

    if (activities?.some(activities => !JSON.parse(activities.users)[0])) return "Sin Asignar"
    if (activities?.some(activities => activities.state.toUpperCase() === "CREATED")) return "En Espera"
    if (activities?.some(activities => activities.state.toUpperCase() === "STARTED")) return "En Proceso"
    return "Terminadas"
}

export default getStateOt;