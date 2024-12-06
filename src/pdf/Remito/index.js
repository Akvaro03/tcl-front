import Style from "./Remito.module.css";
// import { useEffect } from "react";
import formatDateM from "../../hooks/formatDateM";
// import postData from "../../db/postData";
// import { Box, Typography } from "@mui/material";
// import getIp from "../../hooks/getIp";
import useGetDataPdf from "../customHooks/useGetDataPdf";
import HeaderPdf from "../components/headerPdf";
import CompanyDataPdf from "../components/companyDataPdf";
import ProductDataPdF from "../components/productDataPdf";
import EstimatedDatePdf from "../components/estimatedDatePdf";
import DateTablePdf from "../components/dateTablePdf";
import FormatSendPdf from "../components/formatSendPdf";
import { Box, Typography } from "@mui/material";

function Remito() {
  const { ot, client, contact, document, location, description } =
    useGetDataPdf();

  return (
    <Box className={Style.container} width="700px" height="*27px">
      {ot && (
        <>
          <HeaderPdf ot={ot} name="REMITO / RECIBIDO" />
          <CompanyDataPdf
            ot={ot}
            location={location}
            contact={contact}
            client={client}
            document={document}
          />
          <ProductDataPdF ot={ot} />
          <EstimatedDatePdf ot={ot} />
          <Box
            sx={{
              minHeight: "345px", // Asegura el ancho máximo de 660px
              wordBreak: "break-word", // Permite romper palabras largas
              whiteSpace: "normal", // Asegura que el texto se divida si es necesario
            }}
            className={Style.items}
          >
            <div className={Style.itemHeader}>
              <p>Item</p>
              <p>Descripción</p>
            </div>
            <div className={Style.itemsContent}>
              {description !== undefined &&
                description.map((data, key) => (
                  <div className={Style.product} key={key}>
                    <p>{data.item}</p>
                    <p>{data.Description}</p>
                  </div>
                ))}
            </div>
          </Box>
          <Box sx={{ minHeight: "200px" }}>
            <Box className={Style.observationsTittle}>
              <Typography ml={1} fontSize={15}>
                {" "}
                Observaciones:
              </Typography>
            </Box>
            <Typography
              sx={{
                maxWidth: "580px", // Asegura el ancho máximo de 660px
                wordBreak: "break-word", // Permite romper palabras largas
                whiteSpace: "normal", // Asegura que el texto se divida si es necesario
              }}
              //   className={Style.observationsContent}
              ml={1.1}
            >
              {ot.Observations}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            borderBottom={"1px solid black"}
            borderTop={"1px solid black"}
            gutterBottom
            padding={"3px"}
          >
            <Typography ml={1} fontSize={15}>
              Fecha de vencimiento del certificado:
            </Typography>
            <Typography fontSize={15} mr={1}>
              {" "}
              {formatDateM(ot.FechaVencimiento)}
            </Typography>
          </Box>
          <FormatSendPdf />
          {/* <DateTablePdf /> */}
          <div className={Style.note}>
            {"Devolucion de muestra / equipo".toUpperCase()}
          </div>
          <div className={Style.firms}>
            <div className={Style.firmContent}>
              <div className={Style.firmTittle}>
                <p>Firma</p>
              </div>
              <div className={Style.firm}></div>
              <div className={Style.firmNote}></div>
            </div>
            <div className={Style.firmContent}>
              <div className={Style.firmTittleWithBorder}>
                <p>Aclaracion + DNI</p>
              </div>
              <div className={Style.firmWithBorder}></div>
              <div className={Style.firmNote}>
                <p>Por parte del cliente</p>
              </div>
            </div>
            <div className={Style.firmContent}>
              <div className={Style.firmTittle}>
                <p>Fecha</p>
              </div>
              <div className={Style.firm}></div>
              <div className={Style.firmNote}></div>
            </div>
          </div>
        </>
      )}
    </Box>
  );
}
export default Remito;
