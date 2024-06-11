import ItemCard from "../ItemCard/itemCard";
import Style from "./CardOt.module.css"
import formatDateM from "../../../../hooks/formatDateM";
import ButtonAuth from "../../../../components/buttonAuth";
import { Box } from "@mui/material";
import PriorityOt from "../../../../components/priorityOt";
function CardOt({ ot, resetOt, handleChangeOt }) {
    return (
        <div className={Style.cardData}>
            <Box position={"absolute"} right={"6%"} zIndex={2} top={"-1%"} color={"white"} component={"div"} onClick={handleChangeOt}>
                <PriorityOt priority={ot.priority} />
            </Box>
            <ItemCard tittle={"OT Seleccionada"} isTittle isFirst>
                {ot.OTKey}
            </ItemCard>
            <ItemCard tittle={"Autorización"}>
                <ButtonAuth onclick={() => handleChangeOt("Auth", ot.Auth === "1" ? "0" : "1")} auth={ot.Auth} />
            </ItemCard>
            <ItemCard tittle={"ID de OT"}>
                {ot.id}
            </ItemCard>
            <ItemCard tittle={"Tipo de OT"}>
                {ot.Type}
            </ItemCard>
            <ItemCard tittle={"Fecha"}>
                {formatDateM(ot.Date)}
            </ItemCard>
            <ItemCard tittle={"Vto. DEL CERTIFICADO"}>
                {formatDateM(ot.FechaVencimiento)}
            </ItemCard>
            <ItemCard tittle={"Nº Lacre"}>
                {ot.nLacre}
            </ItemCard>
            <ItemCard tittle={"Contrato"}>
                {ot.contractName?.label}
            </ItemCard>

            <ItemCard isSpace />

            <ItemCard tittle={"Cliente Informacion"} isTittle />
            <ItemCard tittle={"Empresa"}>
                {ot.Client}
            </ItemCard>
            <ItemCard tittle={"N° Cliente"}>
                {ot.IdClient}
            </ItemCard>
            <ItemCard tittle={"Contacto"}>
                {ot.IdClient}
            </ItemCard>

            <ItemCard isSpace />

            <ItemCard tittle={"Actividades"} isTittle>
                actividades
            </ItemCard>

            <ItemCard isSpace />

            <ItemCard tittle={"Producto"} isTittle />
            <ItemCard tittle={"Nombre"}>
                {ot.Producto}
            </ItemCard>
            <ItemCard tittle={"Marca"}>
                {ot.Marca}
            </ItemCard>
            <ItemCard tittle={"Modelo"}>
                {ot.Modelo}
            </ItemCard>
            <ItemCard tittle={"Cotizacion"}>
                {ot.Cotizacion}
            </ItemCard>
            <ItemCard tittle={"Disposición"}>
                Disposición
            </ItemCard>
            <ItemCard tittle={"Observación"}>
                {ot.Observations}
            </ItemCard>

            <ItemCard isSpace />

            <ItemCard tittle={"Facturación"} isTittle />
            <ItemCard tittle={"Facturación"}>
                Facturación
            </ItemCard>
            <ItemCard tittle={"Detalles"} isLast>
                Detalles
            </ItemCard>
        </div>
    );
}

export default CardOt;