import getDataFromUrl from "../../hooks/getDataFromUrl"

async function nameUsed(newName, type) {
    const nameFormat = newName.trim().toLowerCase();
    const states = {
        typeOT: await getTypesNames(),
        activity: await getActivitiesNames(),
        client: await getClientsNames(),
        user: await getUserNames(),
        pays: await getPaysNames(),
    };
    const names = states[type];
    return names.includes(nameFormat);
}
function getTypesNames() {
    return getDataFromUrl("http://localhost:4000/getTypeOt")
        .then(data => data.map(type => type.nameType.trim().toLowerCase()));
}
function getActivitiesNames() {
    return getDataFromUrl("http://localhost:4000/getActivities")
        .then(data => data.map(activity => activity.name.trim().toLowerCase()))
}
function getClientsNames() {
    return getDataFromUrl("http://localhost:4000/getClients")
        .then(data => data.map(client => client.Name.trim().toLowerCase()))
}
function getPaysNames() {
    return getDataFromUrl("http://localhost:4000/getPay")
        .then(data => data.map(pay => pay.id.trim().toLowerCase()))
}
function getUserNames() {
    return getDataFromUrl("http://localhost:4000/getUsers")
        .then(data => data.map(client => client.name.trim().toLowerCase()))
}
export default nameUsed;