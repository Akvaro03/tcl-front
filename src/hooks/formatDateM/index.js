function formatDateM(mili) {
    return new Date(mili).toLocaleDateString("en-GB");
}

export default formatDateM;