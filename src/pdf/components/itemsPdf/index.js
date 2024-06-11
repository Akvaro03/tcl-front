import formatDateM from "../../../hooks/formatDateM";
import formatMoney from "../../../hooks/formatMoney";
import AllPrices from "../../OrdenTrabajo/allPrice";
import Style from "./itemsPdf.module.css"

function ItemsPdf({ ot, description, isTotal }) {
    return (
        <div className={Style.items}>
            <div className={Style.product}>
                <p>Item</p>
                <p>Descripción</p>
                <p>Monto(sin IVA)</p>
            </div>
            <div className={Style.itemsContent}>
                {description !== undefined && description.map((data, key) => (
                    <div className={Style.product} key={key}>
                        <p>{data.item}</p>
                        <p>{data.Description}</p>
                        {data.import > 0 && (
                            <p>{formatMoney.format(data.import)}</p>
                        )}
                    </div>
                ))}
                {isTotal && (
                    <div className={Style.total}>
                        <p></p>
                        <p></p>
                        <p>Total(sin IVA):</p>
                        {description !== undefined && (
                            <AllPrices Description={description} />
                        )}
                    </div>
                )}
            </div>
            <div className={Style.observations}>
                <div className={Style.observationsTittle}>
                    Observaciones:
                </div>
                <div className={Style.observationsContent}>
                    {ot.Observations}
                </div>
            </div>
            <div className={Style.dueDate}>
                <p >
                    Fecha de vencimiento del certificado:
                </p>
                {formatDateM(ot.FechaVencimiento)}
            </div>
        </div>
    );
}

export default ItemsPdf;