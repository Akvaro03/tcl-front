import { useEffect, useRef } from "react";
import { closeEsc } from "../../hooks/closeEsc";
import { Box, Button } from "@mui/material";
import TittleComponent from "../tittleComponent";
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormPrototype({ close, children, tittle, onDelete }) {
    const divRef = useRef(null);
    useEffect(() => {

        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };
    }, [close])
    return (
        <Box autoFocus={true} ref={divRef} tabIndex={0} component={"div"} sx={{ background: "white", alignItems: "center", flexDirection: "column", display: "flex", boxShadow: "rgba(19, 21, 22, 0.35) 0px 5px 15px", width: "50%", height: "60%", borderRadius: "15px" }}>
            <Box component={"div"} sx={{ fontWeight: "bold", fontSize: "20px", width: "100%", marginBottom: "5px", marginTop: "30px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {onDelete ? <Button onClick={onDelete} sx={{ color: "black", visibility: "hidden" }}><DeleteIcon /></Button> : <Box></Box>}
                <TittleComponent text={tittle} />
                {onDelete ? <Button onClick={onDelete} sx={{ color: "black" }}><DeleteIcon /></Button> : <Box></Box>}
            </Box>
            {children}
        </Box>
    )
}