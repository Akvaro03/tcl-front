import { Box, Button } from "@mui/material";
import Style from "./listItems.module.css"

function ListItems({ Users, Ots }) {
    return (
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                <Colum data={"Tipo"} />
                <Colum data={"Emision"} />
                <Box sx={{ alignItems: "center", padding: "6px", width: "15%", display: "flex", justifyContent: "center" }}>
                    Estado
                </Box>
            </Box>
            {Ots && Ots[0] ? (
                Ots.map((OT) => (
                    JSON.parse(OT.Activities).map((activity, key) => (
                        <div key={key} className={Style.ColumOt}>
                            <Colum data={activity.name} />
                            <Colum data={(activity.emit === 1 ? "Se" : "No se") + " emite"} />
                            {activity.state === "created" ? (
                                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <h1>Sin empezar</h1>
                                </Box>
                            ) : false ? (
                                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <h1>Sin estado todavia</h1>
                                </Box>
                            ) : (
                                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <h1>Sin estado todavia</h1>
                                </Box>
                            )}
                            <div className={Style.buttonAuth}>
                                <Button >Empezar</Button>
                            </div>
                        </div>
                    ))
                ))
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                    <h1>No hay OT</h1>
                </Box>
            )
            }
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
export default ListItems;