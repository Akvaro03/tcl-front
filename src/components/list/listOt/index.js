import isActivitiesEnd from "../../../hooks/isActivitiesEnd";
import isUserAssigned from "../../../hooks/isUserAssigned";
import getDataFromUrl from "../../../hooks/getDataFromUrl";
import messageHistory from "../../../hooks/messageHistory";
import formatDateM from "../../../hooks/formatDateM";
import { Box, Button, Fade } from "@mui/material";
import changeAuth from "../../../db/changeAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./listOt.module.css"
import FilterOT from "../filter";

function ListOt({ listOt, handleAuth, filterOt }) {
    const [clients, setClients] = useState()
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getClients")
            .then(data => setClients(data.map(client => client.Name)))
    }, [])
    const navigate = useNavigate();
    const handleChangeAuth = (OT) => {
        const newAuth = OT.Auth === "1" ? 0 : 1;
        const dataToSend = { otId: OT.id, newAuth };
        changeAuth(dataToSend, OT.id,
            messageHistory.tittleEditaAuth, "")
        handleAuth(OT)
    }
    return (
        <Box component={"div"} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", height: "95%" }}>
            {clients && (
                <>
                    <FilterOT filterOt={filterOt} namesMultiple={clients} />
                    <Fade in={true}>
                        <div className={Style.contentListOt}>
                            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                                <Colum data={"Id"} width="10%"/>
                                <Colum data={"Fecha"} />
                                <Colum data={"Tipo"} />
                                <Colum data={"Cliente"} />
                                <Colum data={"Producto"} />
                                <Colum data={"Estado"} width="15%"/>
                            </Box>
                            {listOt && listOt[0] ? (
                                listOt.map((OT, key) => (
                                    <div key={key} className={Style.ColumOt} onDoubleClick={() => navigate(`/events/${OT.id}`)}>
                                        <Colum data={OT.id} width="10%" />
                                        <Colum data={formatDateM(OT.Date)} />
                                        <Colum data={OT.Type} />
                                        <Colum data={OT.Client} />
                                        <Colum data={OT.Producto} />
                                        {OT.Auth === "0" ? (
                                            <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <h1>Sin Autorizar</h1>
                                            </Box>
                                        ) : !isUserAssigned(OT) ? (
                                            <Box component="div" onClick={() => navigate(`/events/${OT.id}`)} sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <h1>Sin asignar</h1>
                                            </Box>
                                        ) : isActivitiesEnd(OT.Activities) ? (
                                            <Box sx={{ borderRadius: "20px", margin: "5px", background: "#92ff6c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <h1>Terminada</h1>
                                            </Box>
                                        ) : (
                                            <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <h1>En Proceso</h1>
                                            </Box>
                                        )}
                                        {OT.Auth === "0" && (
                                            <div className={Style.buttonAuth}>
                                                <Button onClick={() => handleChangeAuth(OT)}>Autorizar OT</Button>
                                            </div>
                                        )}

                                    </div>
                                ))
                            ) : (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                                    <h1>No hay OT</h1>
                                </Box>
                            )}
                        </div >
                    </Fade>
                </>
            )}
        </Box>
    );
}

const Colum = ({ data, width = "13%" }) => (
    <Box sx={{ alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);

export default ListOt;