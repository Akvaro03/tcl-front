import { Typography } from "@mui/material";
import Style from "./headerPdf.module.css"
import formatDateM from "../../../hooks/formatDateM";


function HeaderPdf({ name = "no hay nombre", ot }) {
    return (
        <div className={Style.header}>
            <div className={Style.tittle}>
                <h1>Laboratorio Consultar S.R.L</h1>
                <Typography variant="p" gutterBottom border={"1px solid black"} padding={"8px"} bgcolor={"#ebebeb"}>
                    {name}
                </Typography>
                <div className={Style.dateNumber}>
                    <p>{formatDateM(ot.Date)}</p>
                </div>
            </div>
            <div className={Style.numberOrder}>
                <Typography variant="p" gutterBottom padding={"8px"} bgcolor={"#ebebeb"} border={"1px solid black"}>
                    {`Numero: ${ot.OTKey}`}
                </Typography>

                <Typography variant="p" gutterBottom padding={"8px"} bgcolor={"#ebebeb"}>
                    Ord. 1026
                </Typography>
            </div>
        </div>
    );
}

export default HeaderPdf;