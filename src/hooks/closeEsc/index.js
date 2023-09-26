export const closeEsc = (event, functToMake) => {
    if (event.key === 'Escape') {
        functToMake()
    }
}