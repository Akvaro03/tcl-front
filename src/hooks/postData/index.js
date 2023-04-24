function postData(url, dataToSend) {
    return new Promise((resolve, reject) => {
        const xhr1 = new XMLHttpRequest();
        xhr1.open('POST', url, true);
        xhr1.setRequestHeader('Content-type', 'application/json');
        xhr1.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        xhr1.send(JSON.stringify(dataToSend));
    })
}

export default postData;