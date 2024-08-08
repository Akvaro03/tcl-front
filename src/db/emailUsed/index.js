import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";

async function emailUsed(newEmail) {
    const nameFormat = newEmail.trim().toLowerCase();
    const emails = await getUserEmail();
    return emails.includes(nameFormat);
}

function getUserEmail() {
    return fetchAsyncUrl("/getUsers")
        .then(data => data.map(client => client.email.trim().toLowerCase()))
}


export default emailUsed;