export default function getStateActivity(ot) {
    try {
        const activities = JSON.parse(ot.Activities);
        const auth = ot.Auth;

        const allActivitiesEnded = activities.every(data => data.state === "End");
        const allActivitiesInProgress = activities.every(data => data.state === "En proceso");

        if (allActivitiesEnded && auth) {
            return "Terminada";
        }
        if (auth) {
            console.log(ot)
        }

        if (allActivitiesInProgress && auth) {
            return "En proceso";
        }
        return "No empezo";
    } catch (error) {
        return "Terminada";
    }
}