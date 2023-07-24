import changeActOt from "../../../../db/changeActOt";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Style from "./listItems.module.css"

function ListItems({ Ots, setOts }) {
    const handleStateActivity = (newState, activity, OT) => {
        setOts(prev => prev.map(ot => ot === OT ? { ...OT, Activities: changeAct(OT.Activities, newState, activity) } : ot))
        changeActOt({ id: OT.id, activity: [{ ...activity, state: newState }] }, OT.id, "Se cambio el estado")
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
                    return activities.map((activity, key) => (
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
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                    <h1>No hay OT</h1>
                </Box>
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
const changeAct = (Activities, newState, newActivity) => {
    const otChanged = JSON.parse(Activities).map((activity => activity.name === newActivity.name ? { ...newActivity, state: newState } : activity));
    return JSON.stringify(otChanged);
}
export default ListItems;