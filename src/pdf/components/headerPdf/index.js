import { Typography } from "@mui/material";
import Style from "./headerPdf.module.css";
import formatDateM from "../../../hooks/formatDateM";
import { Box } from "@mui/material";

function HeaderPdf({ name = "no hay nombre", ot }) {
  const formattedDate = formatDateM(ot.Date); // Ejemplo de formato: "YYYY-MM-DD"
  const [year, month, day] = formattedDate.split("-");
  return (
    <Box className={Style.header}>
      <Box
        // className={Style.tittle}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "20px",
          marginRight: "15px",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          Laboratorio Consultar S.R.L
        </Typography>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="p"
          gutterBottom
          border={"1px solid black"}
          padding={"8px"}
          bgcolor={"#ebebeb"}
        >
          {name}
        </Typography>
        <Typography variant="p" gutterBottom padding={"8px"}>
          {day}
          {month}
          {year}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "20px",
          marginRight: "20px",
        }}
        // border={"1px solid black"}
      >
        {/* <Box className={Style.numberOrder}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginRight: "10px" }}>NÚMERO:</Typography>
          <Typography
            variant="p"
            gutterBottom
            padding={"8px"}
            bgcolor={"#ebebeb"}
            border={"1px solid black"}
          >
            {`${ot.OTKey}`}
          </Typography>
        </Box>
        <Typography
          variant="p"
          gutterBottom
          border={"1px solid black"}
          padding={"8px"}
          bgcolor={"#ebebeb"}
        >
          Ord. 1026
        </Typography>
        {/* </Box> */}
      </Box>
    </Box>
  );
}

export default HeaderPdf;
