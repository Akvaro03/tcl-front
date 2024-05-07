import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";

async function idEditableUsed(idNew) {
    const state = await fetchAsyncUrl("/getClients")
        .then(data => data.map(type => type.idEditable));
    return state.includes(Number(idNew));
}

export default idEditableUsed;