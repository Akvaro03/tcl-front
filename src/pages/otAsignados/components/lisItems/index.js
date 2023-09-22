import changeActOt from "../../../../db/changeActOt";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Style from "./listItems.module.css"

function ListItems({ Ots, reload, emit, user }) {
    const handleStateActivity = (newState, activity, OT) => {
        changeActOt({ id: OT.id, activity: addNewActivity(OT, { ...activity, state: newState }) }, OT.id, "Se cambio el estado")
        reload()
    }
    const navigate = useNavigate();
    return (
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                <Colum data={"Id OT"} />
                <Colum data={"Tipo"} />
                <Colum data={"Emision"} />
                <Box sx={{ alignItems: "center", padding: "6px", width: "15%", display: "flex", justifyContent: "center" }}>
                    Estado
                </Box>
            </Box>
            {Ots && Ots[0] ? (
                Ots.map((OT) => {
                    const activities = JSON.parse(OT.Activities);
                    const activitiesFiltered = activities.filter(activity => JSON.parse(activity.users).includes(user.name))
                    return activitiesFiltered.map((activity, key) => (
                        <div key={key} className={Style.ColumOt}
                            onDoubleClick={() => navigate(`/events/${OT.id}`)}>
                            <Colum data={OT.id} />
                            <Colum data={activity.name} />
                            <Colum data={(activity.emit === 1 ? "Se" : "No se") + " emite"} />
                            {activity.state === "created" ? (
                                <>
                                    <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>Sin empezar</h1>
                                    </Box>
                                    <div className={Style.buttonAuth}>
                                        <Button onClick={() => handleStateActivity("Started", activity, OT)}>Empezar</Button>
                                    </div>
                                </>
                            ) : activity.state === "Started" ? (
                                <>
                                    <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>En Proceso</h1>
                                    </Box>
                                    <div className={Style.buttonAuth}>
                                        <Button onClick={() => handleStateActivity("End", activity, OT)}>Terminar</Button>
                                    </div>
                                </>
                            ) : (
                                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#a1ff75", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <h1>Terminado</h1>
                                </Box>
                            )}
                        </div>
                    ));
                })
            ) : !emit[0] && (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                    <h1>No hay OT</h1>
                </Box>
            )}
            {emit && emit[0] && (
                <div className={Style.ColumOt}>
                    <Colum />
                    <Colum />
                    <Colum />
                    <Colum data={"Team"} />
                </div>
            )}
            {emit && emit[0] && (
                emit.map(OT => {
                    const activities = JSON.parse(OT.Activities);
                    const activitiesFiltered = activities.filter(activity => {
                        const users = JSON.parse(activity.users)
                        return tienenValoresEnComun(users, user.Team);
                    })
                    return activitiesFiltered.map((activity, key) => (
                        <div key={key} className={Style.ColumOt} onDoubleClick={() => navigate(`/events/${OT.id}`)}>
                            <Colum data={OT.id} />
                            <Colum data={activity.name} />
                            <Colum data={(activity.emit === 1 ? "Se" : "No se") + " emite"} />
                            {activity.state === "created" ? (
                                <>
                                    <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>Sin empezar</h1>
                                    </Box>
                                    <div className={Style.buttonAuth}>
                                        <Button onClick={() => handleStateActivity("Started", activity, OT)}>Empezar</Button>
                                    </div>
                                </>
                            ) : activity.state === "Started" ? (
                                <>
                                    <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>En Proceso</h1>
                                    </Box>
                                    <div className={Style.buttonAuth}>
                                        <Button onClick={() => handleStateActivity("End", activity, OT)}>Terminar</Button>
                                    </div>
                                </>
                            ) : (
                                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#a1ff75", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <h1>Terminado</h1>
                                </Box>
                            )}
                        </div>
                    ));
                })
            )}
        </div >
    );
}

const Colum = ({ data }) => {
    return (
        <Box sx={{ alignItems: "center", padding: "6px", width: "13%", display: "flex", justifyContent: "center" }}>
            {data}
        </Box>
    )
}
const addNewActivity = (prevActivities, newActivity) => {
    return JSON.parse(prevActivities.Activities).map(prevActivity => prevActivity.name === newActivity.name ? newActivity : prevActivity)
}
function tienenValoresEnComun(array1, array2) {
    return array1.some(item => array2.includes(item));
}
export default ListItems;