import { Box, Typography } from "@mui/material";
import formatDateM from "../../../hooks/formatDateM";
import Style from "./estimatedDatePdf.module.css";

function EstimatedDatePdf({ ot }) {
  return (
    <Box sx={{ height: "30px" }} className={Style.estimatedDate}>
      <div className={Style.date}>
        <Typography fontSize={15} className={Style.estimatedDateTittle}>
          Fecha estimada de entrega:
        </Typography>
        <Typography fontSize={15} sx={{ fontWeight: "bolder" }}>
          {formatDateM(ot.FechaEstimada)}
        </Typography>
      </div>
      <Box className={Style.price}>
        <Typography mr={0.5} fontSize={15}>
          Cotización:
        </Typography>
        <Typography
          variant="p"
          minWidth={"130px"}
          margin={"0px"}
          padding={"1px"}
          gutterBottom
          border={"1px solid black"}
          width={"80px"}
          textAlign={"center "}
        >
          {ot.Cotizacion}
        </Typography>
      </Box>
    </Box>
  );
}

export default EstimatedDatePdf;
