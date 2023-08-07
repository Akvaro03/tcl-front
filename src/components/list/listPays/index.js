import formatDateM from "../../../hooks/formatDateM";
import { Box, Fade } from "@mui/material";
import Style from "./listPays.module.css";


function ListPays({ pays }) {
    return (
        <Fade in={true}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                <div className={Style.contentListOt}>
                    <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                        <Colum data={"Id"} width="10%" />
                        <Colum data={"Fecha de Creación"} />
                        <Colum data={"Fecha de Vencimiento"} />
                        <Colum data={"Fecha de Cobro"} />
                    </Box>
                    {pays && pays[0] ? (
                        pays.map((Pay, key) => (
                            <div key={key} className={Style.ColumOt} >
                                <Colum data={Pay.id} width="10%" />
                                <Colum data={formatDateM(Pay.dateCreated)} />
                                <Colum data={formatDateM(Pay.dateExpiration)} />
                                <Colum data={Pay.datePay === null ? "No se Cobro" : formatDateM(Pay.datePay)} />
                            </div>
                        ))
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70%", fontSize: "25px" }}>
                            <h1>No hay Factura</h1>
                        </Box>
                    )}
                </div>

            </Box>
        </Fade>
    );
}
const Colum = ({ data, width = "16%" }) => (
    <Box sx={{ alignItems: "center", padding: "6px", width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);

export default ListPays;