import ItemCard from "./itemCard";
import Style from "./cardData.module.css"
import formatDateM from "../../../hooks/formatDateM";
function CardOt({ ot, resetOt }) {
    return (
        <div className={Style.cardData}>
            <ItemCard tittle={"OT Seleccionada"} isTittle>
                {ot.OTKey}
            </ItemCard>
            <ItemCard tittle={"Autorización"}>
                {ot.OTKey}
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

            <ItemCard isSpace/>
            
            <ItemCard tittle={"Contrato"}>
                {ot.contractName?.label}
            </ItemCard>

        </div>
    );
}

export default CardOt;