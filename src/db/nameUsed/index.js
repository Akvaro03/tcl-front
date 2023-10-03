import getDataFromUrl from "../../hooks/getDataFromUrl"

async function nameUsed(newName, type) {
    const nameFormat = newName.trim().toLowerCase();
    const states = {
        codeClient: await getCodeClient(),
        abbreviation: await getAbbreviationNames(),
        activity: await getActivitiesNames(),
        client: await getClientsNames(),
        typeOT: await getTypesNames(),
        user: await getUserNames(),
        pays: await getPaysNames(),
    };
    const names = states[type];
    return names.includes(nameFormat);
}
function getCodeClient() {
    return getDataFromUrl("/getClients")
        .then(data => data.map(type => type.KeyUnique.trim().toLowerCase()));
}
function getAbbreviationNames() {
    return getDataFromUrl("/getTypeOt")
        .then(data => data.map(type => type.abbreviation.trim().toLowerCase()));
}
function getTypesNames() {
    return getDataFromUrl("/getTypeOt")
        .then(data => data.map(type => type.nameType.trim().toLowerCase()));
}
function getActivitiesNames() {
    return getDataFromUrl("/getActivities")
        .then(data => data.map(activity => activity.name.trim().toLowerCase()))
}
function getClientsNames() {
    return getDataFromUrl("/getClients")
        .then(data => data.map(client => client.Name.trim().toLowerCase()))
}
function getPaysNames() {
    return getDataFromUrl("/getPay")
        .then(data => data.map(pay => pay.id.trim().toLowerCase()))
}
function getUserNames() {
    return getDataFromUrl("/getUsers")
        .then(data => data.map(client => client.name.trim().toLowerCase()))
}
export default nameUsed;