import { useParams } from "react-router-dom";
import Style from "./Remito.module.css"
import { useEffect, useState } from "react";
import formatDateM from "../../hooks/formatDateM";
import postData from "../../db/postData";
import { Box, Typography } from "@mui/material";

function Remito() {
    const { id } = useParams();
    const [ot, setOt] = useState()
    const [client, setClient] = useState()
    const [contact, setContact] = useState()
    const [document, setDocument] = useState()
    const [location, setLocation] = useState()
    useEffect(() => {
        const getOt = async () => {
            const ot = await postData("http://localhost:4000/getOneOt", { id }).then(response => response[0])
            const client = await postData("http://localhost:4000/getOneClient", { Name: ot.Client }).then(Client => Client[0])
            setOt(ot)
            setClient(client)
            setLocation(JSON.parse(client.location))
            ot.Contact && setContact(JSON.parse(ot.Contact))
            setDocument(JSON.parse(client.Document))
        }
        getOt()
    }, [id])
    return (
        <div className={Style.container}>
            {ot && (
                <>
                    <div className={Style.header}>
                        <div className={Style.tittle}>
                            <h1>Laboratorio Consultar S.R.L</h1>
                            <Typography variant="p" gutterBottom border={"1px solid black"} padding={"8px"} bgcolor={"#ebebeb"}>
                                Remito / Recibido
                            </Typography>
                            <div className={Style.dateNumber}>
                                <p>[fo032r7]</p>
                                <p>{formatDateM(ot.Date)}</p>
                            </div>
                        </div>
                        <div className={Style.numberOrder}>
                            <Typography variant="p" gutterBottom padding={"8px"} bgcolor={"#ebebeb"}>
                                {`Numero: ${ot.OTKey}`}
                            </Typography>

                            <Typography variant="p" gutterBottom padding={"8px"} bgcolor={"#ebebeb"}>
                                Ord. 1026
                            </Typography>
                        </div>
                    </div>
                    <div className={Style.companyData}>
                        <div className={Style.data}>
                            <div className={Style.dataContent}>
                                <p className={Style.dataLabel}>Empresa:</p>
                                {<p>{ot.Client}</p>}
                            </div>
                            <div className={Style.dataContent}>
                                <p className={Style.dataLabel}>Dirección:</p>
                                <p>{`${location.province}`}</p>
                            </div>
                            <div className={Style.dataContent}>
                            </div>
                            <div className={Style.dataContent}>
                            </div>
                        </div>
                        <div className={Style.contactData}>
                            <Box justifyContent={"space-between"} display={"flex"} margin={"5px"} width={"90%"}>
                                <p className={Style.dataLabel}>Cliente N°:</p>
                                <Typography variant="p" gutterBottom border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center "}>
                                    {client && client.id}
                                </Typography>
                                <p className={Style.dataLabel}>{document && document.type}:</p>
                                <p>{document && document.value}</p>
                            </Box>
                            <Box justifyContent={"space-between"} display={"flex"} margin={"5px"} width={"90%"}>
                                <Typography variant="p" gutterBottom visibility={"hidden"}>
                                    Cliente N°:
                                </Typography>
                                <Box border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center "}>
                                    <Typography variant="p" gutterBottom >
                                        {client.KeyUnique}
                                    </Typography>
                                </Box>
                                <Typography variant="p" gutterBottom visibility={"hidden"}>
                                    {document && document.type}
                                </Typography>
                                <Typography variant="p" gutterBottom visibility={"hidden"}>
                                    {document && document.value}
                                </Typography>
                            </Box>
                            <div className={Style.dataContent}>
                                <p className={Style.dataLabel}>{contact && contact.type}</p>
                                <p>{contact && contact.value}</p>
                            </div>
                        </div>
                    </div>
                    <div className={Style.productData}>
                        <div className={Style.productDiv}>
                            <p>Producto:</p>
                            {<h1>{ot.Producto}</h1>}
                        </div>
                        <div className={Style.productDiv}>
                            <p>Marca:</p>
                            {<h1>{ot.Marca}</h1>}
                        </div>
                        <div className={Style.productDiv}>
                            <p>Modelo:</p>
                            {<h1>{ot.Modelo}</h1>}
                        </div>
                    </div>
                    <div className={Style.estimatedDate}>
                        <div className={Style.date}>
                            <p className={Style.estimatedDateTittle}>Fecha estimada de entrega:</p>
                            {<p>{ot.FechaEstimada}</p>}
                        </div>
                        <div className={Style.price}>
                            <p className={Style.estimatedDateTittle}>Cotizacion:</p>
                            <Typography variant="p" minWidth={"90px"} margin={"0px"} padding={"4px"} gutterBottom border={"1px solid black"} width={"50px"} textAlign={"center "}>
                                {ot.Cotizacion}
                            </Typography>
                        </div>
                    </div>
                    <div className={Style.items}>
                        <div className={Style.itemHeader}>
                            <p>Item</p>
                            <p>Descripción</p>
                        </div>
                        <div className={Style.itemsContent}>
                            <div className={Style.product}>
                                <p>{ot.Item1}</p>
                                <p>{ot.Description1}</p>
                            </div>
                            <div className={Style.product}>
                                <p>{ot.Item2}</p>
                                <p>{ot.Description2}</p>
                            </div>
                            <div className={Style.product}>
                                <p>{ot.Item3}</p>
                                <p>{ot.Description3}</p>
                            </div>
                        </div>
                        <div className={Style.observations}>
                            <div className={Style.observationsTittle}>
                                Observaciones
                            </div>
                            <div className={Style.observationsContent}>
                                {ot.Observations ? ot.Observations : "Texto de ejemplo de observaciones"}
                            </div>
                        </div>
                    </div>
                    <div className={Style.formatSend}>
                        <p>Formato de entrega autorizada por el cliente:</p>
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
                                <p>Autoriza inicio de tareas</p>
                            </div>
                            <div className={Style.firm}>

                            </div>
                            <div className={Style.firmNote}>
                                <p>Firma Responsable de Laboratorio</p>
                            </div>
                        </div>
                        <div className={Style.firmContent}>
                            <div className={Style.firmTittle}>
                                <p>Retira muestra</p>
                            </div>
                            <div className={Style.firm}>

                            </div>
                            <div className={Style.firmNote}>
                                <p>Por parte del Cliente</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
}
export default Remito;