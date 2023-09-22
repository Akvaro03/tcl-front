export default function getStateActivity(ot) {
    try {
        const activities = JSON.parse(ot.Activities);
        const auth = ot.Auth;

        const allActivitiesEnded = activities.every(data => data.state === "End");
        const allActivitiesInProgress = activities.some(data => data.state === "Started");
        const allActivitiesWithUsers = activities.every(data => JSON.parse(data.users)[0]);


        if (auth && allActivitiesWithUsers && !allActivitiesInProgress) {
            return "En espera"
        }

        if (allActivitiesEnded && auth) {
            return "Terminada";
        }

        if (allActivitiesInProgress && auth) {
            return "En proceso";
        }
        return "No empezo";
    } catch (error) {
        return "Terminada";
    }
}