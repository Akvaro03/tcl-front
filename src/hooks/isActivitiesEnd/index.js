function isActivitiesEnd(activities) {
    try {
        activities = JSON.parse(activities)
        return activities.every(activity => activity.state === "End")
    } catch (error) {
        return true
    }
}

export default isActivitiesEnd;