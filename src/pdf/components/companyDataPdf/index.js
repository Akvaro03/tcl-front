import { Box, Typography } from "@mui/material";
import Style from "./companyDataPdf.module.css"
 
function CompanyDataPdf({ ot, location, contact, client, document }) {
    return (
        <div className={Style.companyData}>
            <div className={Style.data}>
                <div className={Style.dataContent}>
                    <p className={Style.dataLabel}>Empresa:</p>
                    {<p>{ot.Client}</p>}
                </div>
                <div className={Style.dataContent}>
                    <p className={Style.dataLabel}>Dirección:</p>
                    <p className={Style.dataValue} >{`${location}`}</p>
                </div>
                <div className={Style.dataContent}>
                    <p className={Style.dataLabel}>Ref:</p>
                    {contact && (
                        <p className={Style.dataValue} >
                            {JSON.parse(ot.Contact)[0].type}
                        </p>
                    )}
                </div>
                <div className={Style.dataContent}>
                    <p className={Style.dataLabel}>N Lacre:</p>
                    <p className={Style.dataValue} >
                        {ot.nLacre && ot.nLacre}
                    </p>
                </div>
            </div>
            <div className={Style.contactData}> 
                <div className={Style.rowData}>
                    <p className={Style.dataLabel}>Cliente N°:</p>
                    <Typography variant="p" gutterBottom border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center "}>
                        {client && client.idEditable}
                    </Typography>
                </div>
                <div className={Style.rowData}>
                    <p className={Style.dataLabel}></p>
                    <Typography variant="p" gutterBottom border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center "}>
                        {client.KeyUnique}
                    </Typography>
                </div>
                <Box display={"flex"} margin={"5px"} width={"90%"}>
                    <p className={Style.dataLabel}>{document && document.type}:</p>
                    <p>{document && document.value}</p>
                </Box>
                {contact && contact.map((contactValue, key) => (
                    <div className={Style.dataContent} key={key}>
                        <p className={Style.dataLabel}>Contacto:</p>
                        <p>{contactValue.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompanyDataPdf;