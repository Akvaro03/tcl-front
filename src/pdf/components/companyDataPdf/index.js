import { Typography } from "@mui/material";
import Style from "./companyDataPdf.module.css";
import { Box } from "@mui/material";
function CompanyDataPdf({ ot, location, contact, client, document }) {
  return (
    <Box className={Style.companyData}>
      <Box sx={{ minHeight: "90px" }}>
        <Typography fontSize={15}>Empresa: {ot.Client}</Typography>
        <Box sx={{ maxWidth: "400px" }}>
          <Typography fontSize={15}>Dirección: {`${location}`}</Typography>
        </Box>
        <Typography fontSize={15}>
          Email: {JSON.parse(ot.Contact)[0].email}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={15}>Cliente N° </Typography>

          <Typography
            fontSize={15}
            ariant="body1"
            gutterBottom
            border={"1px solid black"}
            padding={"0px"}
            width={"40px"}
            textAlign={"center"}
            mr={1}
            ml={1}
          >
            {client && client.idEditable}
          </Typography>

          <Typography mr={0.5} fontSize={15}>
            {document && document.type}:
          </Typography>
          <Typography fontSize={15}>{document && document.value}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            mb: 0.3,
          }}
        >
          <Typography
            fontSize={15}
            variant="body1"
            border={"1px solid black"}
            padding={"1px"}
            width={"70px"}
            textAlign={"center"}
            mr={1}
          >
            {client && client.KeyUnique}
          </Typography>
          <Box
            sx={{ textAlign: "center", alignItems: "center" }}
            className={Style.rowData2}
          >
            {contact &&
              contact.map((contactValue, key) => (
                <Box key={key}>
                  <Typography fontSize={15}>
                    Tel: {contactValue.cell}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
        <Box className={Style.rowData}>
          {contact &&
            contact.map((contactValue, key) => (
              <Box className={Style.dataContent} key={key}>
                <Typography fontSize={15}>
                  Contacto: {contactValue.contact}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyDataPdf;
