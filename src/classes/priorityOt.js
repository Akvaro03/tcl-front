
export default class ClassPriorityOt {
    static getPriorityColor(string) {
        const types = {
            low: "success",
            height: "warning"
        }

        return types[string]
    }
    static handleClick(state) {
        if (!state) {
            return "low"
        }

        return state === "low" ? "height" : null
    }
}