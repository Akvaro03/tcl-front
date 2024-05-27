import CompanyDataPdf from "./components/companyDataPdf";
import DateTablePdf from "./components/dateTablePdf";
import EstimatedDatePdf from "./components/estimatedDatePdf";
import FormatSendPdf from "./components/formatSendPdf";
import HeaderPdf from "./components/headerPdf";
import ItemsPdf from "./components/itemsPdf";
import NotePdf from "./components/notePdf";
import ProductDataPdF from "./components/productDataPdf";
import Style from "./templatePdf.module.css"

function TemplatePdf({ ot, client, contact, document, location, description, isTotal, children, noteText }) {
    return (
        <div className={Style.container}>
            {ot && (
                <>
                    <HeaderPdf ot={ot} name="Remito / Recibido" />
                    <CompanyDataPdf ot={ot} location={location} contact={contact} client={client} document={document} />
                    <ProductDataPdF ot={ot} />
                    <EstimatedDatePdf ot={ot} />
                    <ItemsPdf description={description} isTotal={isTotal} ot={ot} />
                    <FormatSendPdf />
                    <DateTablePdf />
                    <NotePdf text={noteText}/>
                    {children}
                </>
            )}
        </div>
    );
}

export default TemplatePdf;