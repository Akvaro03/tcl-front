export const sendDataEnter = (event, sendData) => {
    if (event.key === 'Enter') {
        sendData()
    }
}