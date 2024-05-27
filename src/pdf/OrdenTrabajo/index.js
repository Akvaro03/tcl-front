import useGetDataPdf from "../customHooks/useGetDataPdf";
import Style from "./OrdenTrabajo.module.css"
import TemplatePdf from "../templatePdf";
import ContractPDF from "../Contract";

function OrdenTrabajo() {
    const { ot, client, contact, document, location, description } = useGetDataPdf()
    const noteText = "Las muestras estaran disponibles para su retiro durante los proximos 2 MESES posteriores a la fecha de emisión del reporte. Luego pasará a disposición de rezago y YA NO PODRÁ ser reclamada."
    return (
        <>
            <TemplatePdf ot={ot} client={client} contact={contact} description={description} noteText={noteText}
                document={document} isTotal={true} location={location}>
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
            </TemplatePdf>
            {ot && ot.contractName && <ContractPDF contractName={ot.contractName} />}
        </>
    );
}

export default OrdenTrabajo;