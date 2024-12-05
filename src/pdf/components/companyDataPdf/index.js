import { Typography } from "@mui/material";
import Style from "./companyDataPdf.module.css";
import { Box } from "@mui/material";
function CompanyDataPdf({ ot, location, contact, client, document }) {
  return (
    <Box className={Style.companyData}>
      <Box className={Style.data}>
        <Box className={Style.rowData}>
          <p className={Style.dataLabel}>Empresa:</p>
          <p className={Style.dataValue}>{ot.Client}</p>
        </Box>
        <Box className={Style.rowData}>
          <p className={Style.dataLabel}>Dirección:</p>
          <p className={Style.dataValue}>{`${location}`}</p>
        </Box>
        <Box className={Style.rowData}>
          <p className={Style.dataLabel}>
            <b>Email:</b>
          </p>
          {contact[0] && (
            <p className={Style.dataValue}>{JSON.parse(ot.Contact)[0].email}</p>
          )}
        </Box>
      </Box>
      <Box className={Style.contactData}>
        <Box className={Style.rowData3}>
          <p className={Style.dataLabel}>Cliente N°:</p>
          <Typography
            variant="body1"
            gutterBottom
            border={"1px solid black"}
            padding={"4px"}
            width={"50px"}
            textAlign={"center"}
          >
            {client && client.idEditable}
          </Typography>
        </Box>
        <Box className={Style.rowData3}>
          <p className={Style.dataLabel}></p>
          <Typography
            variant="body1"
            gutterBottom
            border={"1px solid black"}
            padding={"4px"}
            width={"50px"}
            textAlign={"center"}
          >
            {client && client.KeyUnique}
          </Typography>
        </Box>
        <Box className={Style.rowData}>
          {contact &&
            contact.map((contactValue, key) => (
              <Box className={Style.dataContent} key={key}>
                <p className={Style.dataLabel}>Contacto:</p>
                <p className={Style.dataValue}>{contactValue.contact}</p>
              </Box>
            ))}
        </Box>
      </Box>
      <Box className={Style.contactDataTotal}>
        <Box className={Style.contactData2}>
          <Box className={Style.rowData2}>
            <p className={Style.dataLabel}>{document && document.type}:</p>
            <p className={Style.dataValue}>{document && document.value}</p>
          </Box>
          <Box className={Style.rowData2}>
            {contact &&
              contact.map((contactValue, key) => (
                <Box className={Style.dataContent} key={key}>
                  <p className={Style.dataLabel}>Telefono:</p>
                  <p className={Style.dataValue}>{contactValue.cell}</p>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyDataPdf;
