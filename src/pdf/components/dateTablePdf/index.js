import Style from "./dateTablePdf.module.css"

function DateTablePdf() {
    return (
        <div className={Style.dateTable}>
            <div className={Style.voidCell}>
            </div>
            <div id={Style.cellDate} className={Style.cellInside}>
                Fecha
            </div>
            <div id={Style.cellName} className={Style.cellInside}>
                Nombre
            </div>
            <div id={Style.cellObservations} className={Style.cellRight}>
                Observaciones
            </div>

            <div className={Style.cellInsideRow2}>
                Inicio
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellRightRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
                Fin
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellRightRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
                Revisión
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellRightRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
                Deposito
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellInsideRow2}>
            </div>
            <div className={Style.cellRightRow2}>
            </div>
        </div>
    );
}

export default DateTablePdf;