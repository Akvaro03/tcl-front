import { Box, Button } from "@mui/material";
import Style from "./listOt.module.css"
import formatDateM from "../../hooks/formatDateM";
import { useNavigate } from "react-router-dom";
import isUserAssigned from "../../hooks/isUserAssigned";
import changeAuth from "../../hooks/changeAuth";

function ListOt({ listOt }) {
    const navigate = useNavigate();
    return (
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                <Colum data={"Id"} />
                <Colum data={"Fecha"} />
                <Colum data={"Tipo"} />
                <Colum data={"Cliente"} />
                <Colum data={"Producto"} />
            </Box>
            {listOt && listOt[0] ? (
                listOt.map((OT, key) => (
                    <div key={key} className={Style.ColumOt} onDoubleClick={() => navigate(`/events/${OT.id}`)}>
                        <Colum data={OT.id} />
                        <Colum data={formatDateM(OT.Date)} />
                        <Colum data={OT.Type} />
                        <Colum data={OT.Client} />
                        <Colum data={OT.Producto} />
                        {OT.Auth === "0" ? (
                            < Box sx={{ width: "13%", display: "flex", justifyContent: "center" }}>
                                <Button onClick={() => changeAuth(OT)}>Autorizar OT</Button>
                            </Box>
                        ) : !isUserAssigned(OT) ? (
                            <Box sx={{ width: "13%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>Falta asignar</h1>
                            </Box>
                        ) : (
                            <Box sx={{ width: "13%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>En Proceso</h1>
                            </Box>
                        )}
                    </div>
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

export default ListOt;