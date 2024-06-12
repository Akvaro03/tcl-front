import { Box, Typography } from "@mui/material";
import formatDateM from "../../../hooks/formatDateM";
import Style from "./estimatedDatePdf.module.css"

function EstimatedDatePdf({ ot }) {
    return (
        <div className={Style.estimatedDate}>
            <div className={Style.date}>
                <p className={Style.estimatedDateTittle}>Fecha estimada de entrega:</p>
                <Box sx={{ fontSize: "13px", fontWeight: "bolder"}}>{formatDateM(ot.FechaEstimada)}</Box>
            </div>
            <div className={Style.price}>
                <p className={Style.estimatedDateTittle}>Cotizacion:</p>
                <Typography variant="p" minWidth={"90px"} margin={"0px"} padding={"4px"} gutterBottom border={"1px solid black"} width={"50px"} textAlign={"center "}>
                    {ot.Cotizacion}
                </Typography>
            </div>
        </div>
    );
}

export default EstimatedDatePdf;