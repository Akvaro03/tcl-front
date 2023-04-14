function postData(url, dataToSend) {
        let data = fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
        return data;
}

export default postData;