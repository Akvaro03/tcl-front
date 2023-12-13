export default function getPriorityColor (string) {
    const types = {
        low: "success",
        height: "warning"
    }

    return types[string]
}