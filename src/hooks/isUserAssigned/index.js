function isUserAssigned(OT) {
    try {
        const Activities = JSON.parse(OT.Activities)
        return Activities.every(activity => JSON.parse(activity.users)[0]);
    } catch (error) {
        return true        
    }
}

export default isUserAssigned;