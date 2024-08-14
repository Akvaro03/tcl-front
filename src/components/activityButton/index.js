import Style from "./activityButton.module.css"

function ActivityButton({ activity, onClick, isClickable }) {
    console.log(isClickable)
    const styles = `${Style.activityButton} ${getStyle(activity)}`
    if (!isClickable) return (
        <p
            className={Style.activityButton}>{activity.name}</p>
    )

    return (
        <p
            onClick={() => onClick(activity)}
            className={`${styles} ${Style.isClickable}`}>{activity.name}</p>
    );
}

const getStyle = (activity) => {
    if (!JSON.parse(activity.users)[0]) return ""
    if (activity.state.toUpperCase() === "END") return Style.activityEnd
    if (activity.state.toUpperCase() === "STARTED") return Style.activityProcess
    return Style.activityAssigned
}

export default ActivityButton;