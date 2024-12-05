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
import { Box } from "@mui/material";
function OrdenTrabajo() {
  const { ot, client, contact, document, location, description } =
    useGetDataPdf();
  return (
    <>
      <Box className={Style.container} width="700px" height="1123px">
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
              <Box className={Style.itemHeader}>
                <p>Item</p>
                <p>Descripción</p>
                <p></p>
                <p> Monto(sin IVA)</p>
              </Box>
              <Box className={Style.itemsContent}>
                {description &&
                  description.map((data, key) => (
                    <Box className={Style.product} key={key}>
                      <p>{data.item}</p>
                      <p>{data.Description}</p>
                      <p></p>
                      <p>
                        {data.import > 0 && formatMoney.format(data.import)}
                      </p>
                    </Box>
                  ))}
                <Box className={Style.total}>
                  <p></p>
                  <p>Total(sin IVA):</p>
                  {description && (
                    <Box className="allPrices">
                      <AllPrices Description={description} />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className={Style.observations}>
                <Box className={Style.observationsTittle}>Observaciones:</Box>
                <Box className={Style.observationsContent}>
                  {ot.Observations}
                </Box>
              </Box>
              <Box className={Style.dueDate}>
                <p>Fecha de vencimiento del certificado:</p>
                <h1> {formatDateM(ot.FechaVencimiento)}</h1>
              </Box>
            </Box>
            <FormatSendPdf />
            <DateTablePdf />
            <Box className={Style.note}>
              Las muestras estaran disponibles para su retiro durante los
              proximos 2 MESES posteriores a la fecha de emisión del reporte.
              Luego pasará a disposición de rezago y YA NO PODRÁ ser reclamada.
            </Box>
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
