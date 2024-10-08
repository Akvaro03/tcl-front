import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";
/**
 * @typedef {'codeClient' | 'abbreviation' | 'activity' | 'client' | 'typeOT' | 'user' | 'pays' | 'contract'} StateKeys
 */

/**
 * @param {string} newName
 * @param {StateKeys} type
 * @returns {Promise<boolean>}
 */

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
        contract: await getContractsNames(),
    };
    const names = states[type];
    return names.includes(nameFormat);
}
function getCodeClient() {
    return fetchAsyncUrl("/getClients")
        .then(data => data.map(type => type.KeyUnique !== null ? type.KeyUnique.trim().toLowerCase() : ""));
}
function getAbbreviationNames() {
    return fetchAsyncUrl("/getTypeOt")
        .then(data => data.map(type => type.abbreviation.trim().toLowerCase()));
}
function getTypesNames() {
    return fetchAsyncUrl("/getTypeOt")
        .then(data => data.map(type => type.nameType.trim().toLowerCase()));
}
function getActivitiesNames() {
    return fetchAsyncUrl("/getActivities")
        .then(data => data.map(activity => activity.name.trim().toLowerCase()))
}
function getClientsNames() {
    return fetchAsyncUrl("/getClients")
        .then(data => data.map(client => client.Name.trim().toLowerCase()))
}
function getPaysNames() {
    return fetchAsyncUrl("/getPay")
        .then(data => data.map(pay => pay.id.trim().toLowerCase()))
}
function getUserNames() {
    return fetchAsyncUrl("/getUsers")
        .then(data => data.map(client => client.name.trim().toLowerCase()))
}
function getContractsNames() {
    return fetchAsyncUrl("/getcontracts")
        .then(data => data.map(client => client.name.trim().toLowerCase()))
}
export default nameUsed;