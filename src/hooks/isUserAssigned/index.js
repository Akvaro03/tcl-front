function isUserAssigned(OT) {
    const Activities = JSON.parse(OT.Activities)
    return Activities.every(activity => JSON.parse(activity.users)[0]);
}

export default isUserAssigned;