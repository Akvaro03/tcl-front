import { Box } from "@mui/material";

export default function ComponentError({ text = "Hubo un error al cargar" }) {
    return <Box component={"div"} width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} minHeight={"300px"} alignItems={"center"}>
        {text}
    </Box>
}