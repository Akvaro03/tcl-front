import { Box, Button } from "@mui/material";
import FormPrototype from "../formPrototype";
import ModalPortal from "../modelPortal";

function ConfirmationComponent({ isVisible, close, funcToDo }) {
    if (!isVisible) return null
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Estas seguro?"} >
                <Box sx={{display:"flex", width:"100%", justifyContent:"space-around", paddingBottom:"4vmin"}}>
                    <Button size="large" variant="contained" onClick={funcToDo}>Realizar</Button>
                    <Button size="large" variant="outlined" onClick={close}>Cerrar</Button>
                </Box>
            </FormPrototype>
        </ModalPortal>
    );
}

export default ConfirmationComponent;