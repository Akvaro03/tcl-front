function getStateOt(ot) {
    if (ot.Auth === "-1") return "Anulado";
    if (ot.Auth === "0") return "Sin Autorizar";
    const activities = JSON.parse(ot.Activities);

    if (activities?.some(activity => !JSON.parse(activity.users)[0])) return "Sin Asignar";
    if (activities?.some(activity => activity.state.toUpperCase() === "CREATED")) return "En Espera";
    if (activities?.some(activity => activity.state.toUpperCase() === "STARTED")) return "En Proceso";
    return "Terminadas";
}

export default getStateOt;
