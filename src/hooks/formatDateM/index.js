function formatDateM(ms) {
    return ms ? new Date(ms).toLocaleDateString("en-GB") : "";
}

export default formatDateM;