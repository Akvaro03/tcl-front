import { useEffect } from "react";
import { closeEsc } from "../../hooks/closeEsc";
import { Box, Button, Fade } from "@mui/material";
import TittleComponent from "../tittleComponent";
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormPrototype({ close, children, tittle, onDelete, width = "50%" }) {
    useEffect(() => {
        window.addEventListener('keydown', e => closeEsc(e, close));
        return () => {
            window.removeEventListener('keydown', closeEsc);
        };
    }, [close])
    return (
        <Fade in={true}>
            <Box tabIndex={0} component={"div"} sx={{ background: "white", alignItems: "center", flexDirection: "column", display: "flex", boxShadow: "rgba(19, 21, 22, 0.35) 0px 5px 15px", width: width, borderRadius: "15px" }}>
                <Box component={"div"} sx={{ fontWeight: "bold", fontSize: "20px", width: "100%", marginBottom: "5px", marginTop: "30px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    {onDelete ? <Button onClick={onDelete} sx={{ color: "black", visibility: "hidden" }}><DeleteIcon /></Button> : <Box></Box>}
                    <TittleComponent text={tittle} />
                    {onDelete ? <Button onClick={onDelete} sx={{ color: "black" }}><DeleteIcon /></Button> : <Box></Box>}
                </Box>
                {children}
            </Box>
        </Fade>
    )
}