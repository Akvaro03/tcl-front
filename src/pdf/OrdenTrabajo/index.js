import useGetDataPdf from "../customHooks/useGetDataPdf";
import CompanyDataPdf from "../components/companyDataPdf";
import formatMoney from "../../hooks/formatMoney";
import HeaderPdf from "../components/headerPdf";
import Style from "./OrdenTrabajo.module.css"
import ContractPDF from "../Contract";
import AllPrices from "./allPrice";
import ProductDataPdF from "../components/productDataPdf";
import EstimatedDatePdf from "../components/estimatedDatePdf";
import FormatSendPdf from "../components/formatSendPdf";
import DateTablePdf from "../components/dateTablePdf";
import formatDateM from "../../hooks/formatDateM";

function OrdenTrabajo() {
    const { ot, client, contact, document, location, description } = useGetDataPdf();
    return (
        <>
            <div className={Style.container}>
                {ot && (
                    <>
                        <HeaderPdf ot={ot} name="ORDEN DE TRABAJO" />
                        <CompanyDataPdf ot={ot} location={location} contact={contact} client={client} document={document} />
                        <ProductDataPdF ot={ot} />
                        <EstimatedDatePdf ot={ot} />
                        <div className={Style.items}>
                            <div className={Style.itemHeader}>
                                <p>Item</p>
                                <p>Descripción</p>
                                <p></p>
                                <p> Monto(sin IVA)</p>
                            </div>
                            <div className={Style.itemsContent}>
                                {description && description.map((data, key) => (
                                    <div className={Style.product} key={key}>
                                        <p>{data.item}</p>
                                        <p>{data.Description}</p>
                                        <p></p>
                                        <p>{data.import > 0 && formatMoney.format(data.import)}</p>
                                    </div>
                                ))}
                                <div className={Style.total}>
                                    <p></p>
                                    <p>Total(sin IVA):</p>
                                    {description && (
                                        <div className="allPrices">
                                            <AllPrices Description={description} />
                                        </div>
                                    )}
                                </div>
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
                            Las muestras estaran disponibles para su retiro durante los proximos 2 MESES posteriores a la fecha de emisión del reporte. Luego pasará a disposición de rezago y YA NO PODRÁ ser reclamada.
                        </div>
                        <div className={Style.firms2}>
                            <div className={Style.firmContent}>
                                <div className={Style.firmTittle}>
                                    <p>Firma y aclaracion del Cliente</p>
                                </div>
                                <div className={Style.firm}></div>
                                <div className={Style.firmNote}>
                                    <p>LEER EL CONTRATO AL DORSO</p>
                                </div>
                            </div>
                            <div className={Style.firmContent}>
                                <div className={Style.firmTittle}>
                                    <p>Autoriza inicio de tareas</p>
                                </div>
                                <div className={Style.firm}></div>
                                <div className={Style.firmNote}>
                                    <p>Firma Responsable de Laboratorio</p>
                                </div>
                            </div>
                            <div className={Style.firmContent}>
                                <div className={Style.firmTittle}>
                                    <p>Retira muestra</p>
                                </div>
                                <div className={Style.firm}></div>
                                <div className={Style.firmNote}>
                                    <p>Por parte del Cliente</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {ot && ot.contractName && ot.contractName !== `{"label":"Ninguno"}` && <ContractPDF contractName={ot.contractName} />}
        </>
    );
}
export default OrdenTrabajo;
