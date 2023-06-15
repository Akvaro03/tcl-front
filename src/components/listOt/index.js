import isUserAssigned from "../../hooks/isUserAssigned";
import formatDateM from "../../hooks/formatDateM";
import changeAuth from "../../db/changeAuth";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Style from "./listOt.module.css"

function ListOt({ listOt, setListOt }) {
    const navigate = useNavigate();

    const handleChangeAuth = (OT) => {
        changeAuth(OT)
        setListOt(prev => prev.map(otPrev => otPrev === OT ? { ...OT, Auth: 1 } : otPrev))
    }

    return (
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                <Colum data={"Id"} />
                <Colum data={"Fecha"} />
                <Colum data={"Tipo"} />
                <Colum data={"Cliente"} />
                <Colum data={"Producto"} />
                <Colum data={"Estado"} />
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
                            <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>Falta Autorizar</h1>
                            </Box>
                        ) : !isUserAssigned(OT) ? (
                            <Box component="div" onClick={() => navigate(`/events/${OT.id}`)} sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b36", width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>Falta asignar</h1>
                            </Box>
                        ) : (
                            <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            )
            }
        </div >
    );
}

const Colum = ({ data }) => (
    <Box sx={{ alignItems: "center", padding: "6px", width: "10%", display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);

export default ListOt;