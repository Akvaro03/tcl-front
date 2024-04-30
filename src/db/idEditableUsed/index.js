import getDataFromUrl from "../../hooks/getDataFromUrl"

async function idEditableUsed(idNew) {
    const state = await getDataFromUrl("/getClients")
        .then(data => data.map(type => type.idEditable));
    return state.includes(Number(idNew));
}

export default idEditableUsed;