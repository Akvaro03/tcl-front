function isActivitiesEnd(activities) {
    activities = JSON.parse(activities)
    return activities.every(activity => activity.state === "End")
}

export default isActivitiesEnd;