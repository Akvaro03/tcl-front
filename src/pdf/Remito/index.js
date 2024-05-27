import Style from "./Remito.module.css"
import useGetDataPdf from "../customHooks/useGetDataPdf";
import TemplatePdf from "../templatePdf";

function Remito() {
    const { ot, client, contact, document, location, description } = useGetDataPdf()
    const noteText = "DEVOLUCION DE MUESTRA / EQUIPO"
    return (
        <TemplatePdf ot={ot} client={client} contact={contact} description={description} noteText={noteText}
            document={document} location={location}>
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
        </TemplatePdf>
    );
}




export default Remito;