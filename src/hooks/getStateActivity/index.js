export default function getStateActivity(ot) {
    try {
        const activities = JSON.parse(ot.Activities);
        const auth = ot.Auth;

        const allActivitiesEnded = activities.every(data => data.state === "End");
        const allActivitiesWithUsers = activities.every(data => JSON.parse(data.users)[0]);
        const someActivitiesInProgress = activities.some(data => data.state === "Started");


        if (auth && allActivitiesWithUsers && !someActivitiesInProgress) {
            return "En espera"
        }
        
        if (auth && someActivitiesInProgress) {
            return "En proceso";
        }

        if (auth && allActivitiesEnded ) {
            return "Terminada";
        }

        return "No empezo";
        
    } catch (error) {
        return "Terminada";
    }
}