import { Box, Button } from "@mui/material";

function ConfirmEdit({ sendOTEdit, close }) {
    const saveData = () => {
        sendOTEdit()
    }
    return (
        <Box sx={{ width: "40%", height: "25%", background: "white", borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", width: "100%", height: "50%", justifyContent: "center", alignItems: "center" }}>
                <h1>Quiere guardar los cambios?</h1>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
                <Button size="small" variant="outlined" onClick={() => close()}>Cancelar</Button>
                <Button size="large" variant="contained" onClick={saveData} >Guardar</Button>
            </Box>
        </Box>
    );
}

export default ConfirmEdit;