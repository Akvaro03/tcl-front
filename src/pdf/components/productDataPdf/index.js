import { Box, Typography } from "@mui/material";
import Style from "./productDataPdf.module.css";

function ProductDataPdF({ ot }) {
  return (
    <Box sx={{ minHeight: "80px" }} className={Style.productData}>
      <div className={Style.productDiv}>
        <Typography fontSize={15}>Producto:</Typography>
        {<h1>{ot.Producto}</h1>}
      </div>
      <div className={Style.productDiv}>
        <Typography fontSize={15}>Marca:</Typography>

        {<h1>{ot.Marca}</h1>}
      </div>
      <div className={Style.productDiv}>
        <Typography fontSize={15}>Modelo:</Typography>

        {<h1>{ot.Modelo}</h1>}
      </div>
    </Box>
  );
}

export default ProductDataPdF;
