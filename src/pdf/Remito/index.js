import Style from "./Remito.module.css"
import { useEffect } from "react";
import formatDateM from "../../hooks/formatDateM";
import postData from "../../db/postData";
import { Box, Typography } from "@mui/material";
import getIp from "../../hooks/getIp";
import useGetDataPdf from "../customHooks/useGetDataPdf";
import HeaderPdf from "../components/headerPdf";
import CompanyDataPdf from "../components/companyDataPdf";
import ProductDataPdF from "../components/productDataPdf";
import EstimatedDatePdf from "../components/estimatedDatePdf";
import DateTablePdf from "../components/dateTablePdf";
import FormatSendPdf from "../components/formatSendPdf";

function Remito() {
    const { ot, client, contact, document, location, description } = useGetDataPdf()

    return (
        <div className={Style.container}>
            {ot && (
                <>
                    <HeaderPdf ot={ot} name="Remito / Recibido" />
                    <CompanyDataPdf ot={ot} location={location} contact={contact} client={client} document={document} />
                    <ProductDataPdF ot={ot} />
                    <EstimatedDatePdf ot={ot} />
                    <div className={Style.items}>
                        <div className={Style.itemHeader}>
                            <p>Item</p>
                            <p>Descripción</p>
                        </div>
                        <div className={Style.itemsContent}>
                            {description !== undefined && description.map((data, key) => (
                                <div className={Style.product} key={key}>
                                    <p>{data.item}</p>
                                    <p>{data.Description}</p>
                                </div>
                            ))}
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
                           <h1> {formatDateM(ot.FechaVencimiento)}</h1>
                        </div> 
                    </div>
                    <FormatSendPdf />
                    <DateTablePdf />
                    <div className={Style.note}>
                        {"Devolucion de muestra / equipo".toUpperCase()}
                    </div>
                    <div className={Style.firms}>
                        <div className={Style.firmContent}>
                            <div className={Style.firmTittle}>
                                <p>Firma</p>
                            </div>
                            <div className={Style.firm}>

                            </div>
                            <div className={Style.firmNote}>
                            </div>
                        </div>
                        <div className={Style.firmContent}>
                            <div className={Style.firmTittleWithBorder}>
                                <p>Aclaracion + DNI</p>
                            </div>
                            <div className={Style.firmWithBorder}>

                            </div>
                            <div className={Style.firmNote}>
                                <p>Por parte del cliente</p>
                            </div>
                        </div>
                        <div className={Style.firmContent}>
                            <div className={Style.firmTittle}>
                                <p>Fecha</p>
                            </div>
                            <div className={Style.firm}>

                            </div>
                            <div className={Style.firmNote}>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
}
export default Remito;