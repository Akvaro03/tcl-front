import changeActOt from "../../../../db/changeActOt";
import { Box, Button } from "@mui/material";
import Style from "./listItems.module.css"
import openNewTab from "../../../../hooks/openNewTab";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ListItems({ Ots, reload, user }) {
    const [count, setCount] = useState(0)
    const handleStateActivity = (newState, activity, OT) => {
        changeActOt({ id: OT.id, activity: addNewActivity(OT, { ...activity, state: newState }) }, OT.id, "Se cambio el estado")
        reload()
    }
    const activities = getActivities(Ots, count, user, handleStateActivity);
    return ( 
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "3px solid #1976D2", width: "95%", height: "45px", fontWeight: "bold" }}>
                <Colum data={"OT"} />
                <Colum data={"Actividad"} />
                <Box sx={{ alignItems: "center", padding: "6px", width: "15%", display: "flex", justifyContent: "center" }}>
                    Estado
                </Box>
            </Box>
            {activities.slice((count * 10), ((count * 10) + 10))}
            <Box position={"absolute"} display={"flex"} component={"div"} bgcolor={"#1976d2"} gap={"10px"} padding={"0 10px"} color={"#e5e7eb"} alignItems={"center"} height={"40px"} bottom={"-20px"} right={"5%"} borderRadius={"25px"} border={"1px solid black"}>
                {count > 0 ? (
                    <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => setCount(prev => prev === 0 ? 0 : prev - 1)}>
                        <ArrowBackIcon />
                    </Box>
                ) : (
                    <Box sx={{ visibility: "hidden" }}>
                        <ArrowForwardIcon />
                    </Box>
                )}
                <p>{`Pagina ${count + 1}`}</p>
                {count < ((activities.length / 10) - 1) ? (
                    <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => setCount(prev => prev + 1)}>
                        <ArrowForwardIcon />
                    </Box>
                ) : (
                    <Box sx={{ visibility: "hidden" }}>
                        <ArrowForwardIcon />
                    </Box>
                )}
            </Box>

        </div >
    );
}
const getActivities = (Ots, count, user, handleStateActivity) => {
    const result = filterOT(Ots, user, handleStateActivity)
    const mergedArray = concatArray(result)
    return mergedArray.map((data, key) => [{ ...data, key }])
}
const filterOT = (Ots, user, handleStateActivity) => {
    return Ots.map((OT) => {
        const activities = JSON.parse(OT.Activities);
        const activitiesFiltered = activities.filter(activity => JSON.parse(activity.users).includes(user.name))
        const dataFiltered = activitiesFiltered.map((activity) => (
            <div className={Style.ColumOt}
                onDoubleClick={() => openNewTab(`/events/${OT.id}`)}>
                <Colum data={OT.OTKey} />
                <Colum data={activity.name} />
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
        return dataFiltered
    })
}
const concatArray = (result) => {
    let mergedArray = [];
    for (var i = 0; i < result.length; i++) {
        mergedArray = mergedArray.concat(result[i]);
    }
    return mergedArray
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
export default ListItems;