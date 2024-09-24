import { Typography } from "@mui/material";
import Style from "./companyDataPdf.module.css"

function CompanyDataPdf({ ot, location, contact, client, document }) {
    return (
        <div className={Style.companyData}>
            <div className={Style.data}>
                <div className={Style.rowData}>
                    <p className={Style.dataLabel}>Empresa:</p>
                    <p className={Style.dataValue}>{ot.Client}</p>
                </div>
                <div className={Style.rowData}>
                    <p className={Style.dataLabel}>Dirección:</p>
                    <p className={Style.dataValue}>{`${location}`}</p>
                </div>
                <div className={Style.rowData}>
                    <p className={Style.dataLabel}><b>Email:</b></p>
                    {contact[0] && (
                        <p className={Style.dataValue}>
                            {JSON.parse(ot.Contact)[0].email}
                        </p>
                    )}
                </div>
            </div>
            <div className={Style.contactData}>
                <div className={Style.rowData3}>
                    <p className={Style.dataLabel}>Cliente N°:</p>
                    <Typography variant="body1" gutterBottom border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center"}>
                        {client && client.idEditable}
                    </Typography>
                </div>
                <div className={Style.rowData3}>
                    <p className={Style.dataLabel}></p>
                    <Typography variant="body1" gutterBottom border={"1px solid black"} padding={"4px"} width={"50px"} textAlign={"center"}>
                        {client && client.KeyUnique}
                    </Typography>
                </div>
                <div className={Style.rowData}>
                    {contact && contact.map((contactValue, key) => (
                        <div className={Style.dataContent} key={key}>
                            <p className={Style.dataLabel}>Contacto:</p>
                            <p className={Style.dataValue}>{contactValue.contact}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.contactDataTotal}>
                <div className={Style.contactData2}>
                    <div className={Style.rowData2}>
                        <p className={Style.dataLabel}>{document && document.type}:</p>
                        <p className={Style.dataValue}>{document && document.value}</p>
                    </div>
                    <div className={Style.rowData2}>
                        {contact && contact.map((contactValue, key) => (
                            <div className={Style.dataContent} key={key}>
                                <p className={Style.dataLabel}>Telefono:</p>
                                <p className={Style.dataValue}>{contactValue.cell}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDataPdf;
