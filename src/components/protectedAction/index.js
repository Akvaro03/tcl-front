import { Box, Button, Fade } from "@mui/material";

export default function ProtectedAction({ text, textButton, action, close }) {
    return (
        <>
            <Fade in={true}>
                <Box sx={{ width: "40%", height: "30%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <Box height={"60%"} display={"flex"} alignItems={"center"}>
                        {text}
                    </Box>
                    <Box display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="medium" variant="outlined" onClick={() => action()}>{textButton}</Button>
                        <Button size="medium" variant="contained" onClick={() => close()}>Cancelar</Button>
                    </Box>
                </Box>
            </Fade>
        </>
    );
}