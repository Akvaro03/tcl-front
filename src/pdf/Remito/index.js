import { useParams } from "react-router-dom";
import Style from "./Remito.module.css"
import postData from "../../hooks/postData";
import { useEffect, useState } from "react";
import formatDateM from "../../hooks/formatDateM";
function Remito() {
    const { id } = useParams();
    const [ot, setOt] = useState()
    const [client, setClient] = useState()
    const [contact, setContact] = useState()
    const [document, setDocument] = useState()
    useEffect(() => {
        const getOt = async () => {
            const ot = await postData("http://localhost:4000/getOneOt", { id }).then(response => response[0])
            const client = await postData("http://localhost:4000/getOneClient", { Name: ot.Client }).then(Client => Client[0])
            setOt(ot)
            setClient(client)
            setContact(JSON.parse(ot.Contact))
            setDocument(JSON.parse(client.Document))
        }
        getOt()
    }, [id])

    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <div className={Style.tittle}>
                    <h1>Laboratorio Consultar S.R.L</h1>
                    <p>Remito Recibido</p>
                    <div className={Style.dateNumber}>
                        <p>[fo032r7]</p>
                        <p>{ot && formatDateM(ot.Date)}</p>
                    </div>
                </div>
                <div className={Style.numberOrder}>
                    <h1>Numero: 2226262
                        2 O LONG
                    </h1>
                    <p>Ord. 1026</p>
                </div>
            </div>
            <div className={Style.companyData}>
                <div className={Style.data}>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>Empresa:</p>
                        {<p>{ot && ot.Client}</p>}
                    </div>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>?Dirección:</p>
                        <p>Laprida</p>
                    </div>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>?Localidad:</p>
                        <p>Rosario</p>
                    </div>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>?Provincia:</p>
                        <p>Santa fe</p>
                    </div>
                </div>
                <div className={Style.contactData}>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>Cliente N°:</p>
                        <p>{client && client.id}</p>
                    </div>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>{document && document.type}:</p>
                        <p>{document && document.value}</p>
                    </div>
                    <div className={Style.dataContent}>
                        <p className={Style.dataLabel}>{contact && contact.type}</p>
                        <p>{contact && contact.value}</p>
                    </div>
                </div>
            </div>
            <div className={Style.productData}>
                <div className={Style.productDiv}>
                    <p>Producto:</p>
                    {<h1>{ot && ot.Producto}</h1>}
                </div>
                <div className={Style.productDiv}>
                    <p>Marca:</p>
                    {<h1>{ot && ot.Marca}</h1>}
                </div>
                <div className={Style.productDiv}>
                    <p>Modelo:</p>
                    {<h1>{ot && ot.Modelo}</h1>}
                </div>
            </div>
            <div className={Style.estimatedDate}>
                <div className={Style.date}>
                    <p className={Style.estimatedDateTittle}>Fecha estimada de entrega:</p>
                    {<p>{ot && ot.FechaEstimada}</p>}
                </div>
                <div className={Style.price}>
                    <p className={Style.estimatedDateTittle}>Cotizacion:</p>
                    {<p>{ot && ot.Cotizacion}</p>}
                </div>
            </div>
            <div className={Style.items}>
                <div className={Style.itemHeader}>
                    <p>Item</p>
                    <p>Descripción</p>
                </div>
                <div className={Style.itemsContent}>
                    <div className={Style.product}>
                        <p>{ot && ot.Item1}</p>
                        <p>{ot && ot.Description1}</p>
                    </div>
                    <div className={Style.product}>
                        <p>{ot && ot.Item2}</p>
                        <p>{ot && ot.Description2}</p>
                    </div>
                    <div className={Style.product}>
                        <p>{ot && ot.Item3}</p>
                        <p>{ot && ot.Description3}</p>
                    </div>
                </div>
                <div className={Style.observations}>
                    <div className={Style.observationsTittle}>
                        Observaciones
                    </div>
                    <div className={Style.observationsContent}>
                        {ot && ot.Observations ? ot.Observations : "Texto de ejemplo de observaciones"}
                    </div>
                </div>
            </div>
            <div className={Style.formatSend}>
                <p>?Formato de entrega autorizada por el cliente:</p>
                <h1>Envio por correo electronico y/o fisico</h1>
            </div>
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
            <div className={Style.note}>
                Las muestras estaran disponibles para su retiro durante los proximos 2 MESES posteriores a la fecha de emisión del reporte. Luego pasará a disposición de rezago y YA NO PODRÁ ser reclamada.
            </div>
            <div className={Style.firms}>
                <div className={Style.firmContent}>
                    <div className={Style.firmTittle}>
                        <p>Firma y aclaracion del Cliente</p>
                    </div>
                    <div className={Style.firm}>

                    </div>
                    <div className={Style.firmNote}>
                        <p>LEER EL CONTRATO AL DORSO</p>
                    </div>
                </div>
                <div className={Style.firmContent}>
                    <div className={Style.firmTittle}>
                        <p>Firma y aclaracion del Cliente</p>
                    </div>
                    <div className={Style.firm}>

                    </div>
                    <div className={Style.firmNote}>
                        <p>LEER EL CONTRATO AL DORSO</p>
                    </div>
                </div>
                <div className={Style.firmContent}>
                    <div className={Style.firmTittle}>
                        <p>Firma y aclaracion del Cliente</p>
                    </div>
                    <div className={Style.firm}>

                    </div>
                    <div className={Style.firmNote}>
                        <p>LEER EL CONTRATO AL DORSO</p>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Remito;