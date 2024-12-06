import useGetDataPdf from "../customHooks/useGetDataPdf";
import CompanyDataPdf from "../components/companyDataPdf";
import formatMoney from "../../hooks/formatMoney";
import HeaderPdf from "../components/headerPdf";
import Style from "./OrdenTrabajo.module.css";
import ContractPDF from "../Contract";
import AllPrices from "./allPrice";
import ProductDataPdF from "../components/productDataPdf";
import EstimatedDatePdf from "../components/estimatedDatePdf";
import FormatSendPdf from "../components/formatSendPdf";
import DateTablePdf from "../components/dateTablePdf";
import formatDateM from "../../hooks/formatDateM";
import { Box, Typography } from "@mui/material";
function OrdenTrabajo() {
  const { ot, client, contact, document, location, description } =
    useGetDataPdf();
  return (
    <>
      <Box className={Style.container} width="700px" height="*27px">
        {ot && (
          <>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <HeaderPdf ot={ot} name="ORDEN DE TRABAJO" />
            </Box>
            <CompanyDataPdf
              ot={ot}
              location={location}
              contact={contact}
              client={client}
              document={document}
            />
            <ProductDataPdF ot={ot} />
            <EstimatedDatePdf ot={ot} />
            <Box className={Style.items}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                padding={0.7}
                borderBottom={"1px solid black"}
              >
                <Typography>Item</Typography>
                <Typography>Descripción</Typography>
                <Typography> Monto (sin IVA)</Typography>
              </Box>
              <Box sx={{ minHeight: "250px" }} className={Style.itemsContent}>
                {description &&
                  description.map((data, key) => (
                    <Box className={Style.product} key={key}>
                      <Typography
                        sx={{
                          maxWidth: "50px", // Asegura el ancho máximo de 660px
                          wordBreak: "break-word", // Permite romper palabras largas
                          whiteSpace: "normal", // Asegura que el texto se divida si es necesario
                        }}
                        ml={-2}
                        fontSize={14}
                      >
                        {data.item}
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: "420px", // Asegura el ancho máximo de 660px
                          wordBreak: "break-word", // Permite romper palabras largas
                          whiteSpace: "normal", // Asegura que el texto se divida si es necesario
                        }}
                        fontSize={14}
                        mr={2}
                      >
                        {data.Description}
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: "100px", // Asegura el ancho máximo de 660px
                          wordBreak: "break-word", // Permite romper palabras largas
                          whiteSpace: "normal", // Asegura que el texto se divida si es necesario
                        }}
                        fontSize={15}
                      >
                        {data.import > 0 && formatMoney.format(data.import)}
                      </Typography>
                    </Box>
                  ))}
              </Box>
              <Box className={Style.total}>
                <p></p>
                <p>Total (sin IVA):</p>
                {description && (
                  <Box className="allPrices">
                    <AllPrices Description={description} />
                  </Box>
                )}
              </Box>
              <Box sx={{ minHeight: "200px" }}>
                <Box
                  borderTop={"1px solid black"}
                  className={Style.observationsTittle}
                >
                  <Typography ml={1} fontSize={15}>
                    {" "}
                    Observaciones:
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    marginLeft: "10px",
                    maxWidth: "680px", // Asegura el ancho máximo de 660px
                    wordBreak: "break-word", // Permite romper palabras largas
                    whiteSpace: "normal", // Asegura que el texto se divida si es necesario
                  }}
                  className={Style.observationsContent}
                >
                  {ot.Observations}
                </Typography>
              </Box>
              <Box
                variant="p"
                gutterBottom
                padding={"2px"}
                borderTop={"1px solid black"}
                className={Style.dueDate}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography ml={1} fontSize={15}>
                  Fecha de vencimiento del certificado:
                </Typography>
                <Typography mr={1}>
                  {formatDateM(ot.FechaVencimiento)}
                </Typography>
              </Box>
            </Box>
            {/* FOOTER */}
            <Box sx={{ mt: 0 }}>
              <FormatSendPdf />
              {/* <DateTablePdf /> */}
              <Typography
                border={"1px solid black"}
                fontSize={14.6}
                className={Style.note}
              >
                Las muestras estaran disponibles para su retiro durante los
                proximos 2 MESES posteriores a la fecha de emisión del reporte.
                Luego pasará a disposición de rezago y YA NO PODRÁ ser
                reclamada.
              </Typography>
              <Box className={Style.firms2}>
                <Box className={Style.firmContent}>
                  <Box className={Style.firmTittle}>
                    <p>Firma y aclaracion del Cliente</p>
                  </Box>
                  <Box className={Style.firm}></Box>
                  <Box className={Style.firmNote}>
                    <p>LEER EL CONTRATO AL DORSO</p>
                  </Box>
                </Box>
                <Box className={Style.firmContent}>
                  <Box className={Style.firmTittle}>
                    <p>Autoriza inicio de tareas</p>
                  </Box>
                  <Box className={Style.firm}></Box>
                  <Box className={Style.firmNote}>
                    <p>Firma Responsable de Laboratorio</p>
                  </Box>
                </Box>
                <Box className={Style.firmContent}>
                  <Box className={Style.firmTittle}>
                    <p>Retira muestra</p>
                  </Box>
                  <Box className={Style.firm}></Box>
                  <Box className={Style.firmNote}>
                    <p>Por parte del Cliente</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {ot && ot.contractName && ot.contractName !== `{"label":"Ninguno"}` && (
        <ContractPDF contractName={ot.contractName} />
      )}
    </>
  );
}
export default OrdenTrabajo;
