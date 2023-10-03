import getDataFromUrl from "../../../hooks/getDataFromUrl";
import formatDateM from "../../../hooks/formatDateM";
import { Box, Button, Fade, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import Style from "./listPays.module.css";


function ListPays({ pays, select, saveList, listPay, close }) {
    const [paysData, setPaysData] = useState(pays)
    useEffect(() => {
        if (!pays) {
            const searchData = async () => {
                let paysFound = await getDataFromUrl("/getPay")
                paysFound = select ? paysFound.filter(pay => !listPay.includes(pay.id)) : paysFound
                setPaysData(paysFound)
            }
            searchData()
        }
    }, [pays, listPay, select])

    return (
        <Fade in={true}>
            <Box sx={{ width: select ? "80%" : "100%", display: "flex", flexDirection: "column", height: select ? "80%" : "100%", justifyContent: "center", alignItems: "center" }}>
                <div className={Style.headerListOt}>
                    <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "100%", height: "45px" }}>
                        <Colum data={""} width="25%" />
                        <Box sx={{ width: "50%", alignItems: "center", display: "flex", justifyContent: "center" }}>
                            <Typography component={"h1"} sx={{ fontSize: "19px", fontWeight:"bold", textDecoration:"underline"}}>
                                Lista de facturas
                            </Typography>
                        </Box>
                        {pays ? (
                            <Colum data={""} width="25%" />
                        ) : (
                            <Colum data={<Button sx={{ color: "black" }} onClick={() => close()}><CloseIcon /></Button>} width="25%" />
                        )}
                    </Box>
                    <Box sx={{ display: "flex", borderBottom: "3px solid #1976D2", width: "95%", height: "45px", fontWeight: "bold" }}>
                        <Colum data={"ID"} width="15%" />
                        <Colum data={"Creación"} />
                        <Colum data={"Vencimiento"} width="20%" />
                        <Colum data={"Cobro"} />
                        {/* todo: Agregar un monto  */}
                    </Box>
                    <div className={Style.contentListOt}>
                        {paysData && paysData[0] ? (
                            paysData.map((Pay, key) => (
                                <div key={key} className={Style.ColumOt} onDoubleClick={() => select && saveList(Pay)}>
                                    <Colum data={Pay.id} width="15%" />
                                    <Colum data={formatDateM(Pay.dateCreated)} />
                                    <Colum data={formatDateM(Pay.dateExpiration)} width="20%" />
                                    <Colum data={Pay.datePay === null ? "No se Cobró" : formatDateM(Pay.datePay)} />
                                </div>
                            ))
                        ) : (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70%", fontSize: "25px" }}>
                                <h1>No hay Factura</h1>
                            </Box>
                        )}
                    </div>
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