export const sendDataEnter = (event, functToMake) => {
    if (event.key === 'Enter') {
        functToMake()
    }
}