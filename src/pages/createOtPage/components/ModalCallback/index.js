import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Style from "./ModalCallback.module.css"
import { useState } from "react";
function ModalCallback({ Result, setResult }) {
    const [numberEt, setNumberEt] = useState(2)
    const printPdf = (nameUrl, numberEt) => {
        const newWindow = window.open(`http://localhost:3000/${nameUrl}/${Result}` + (numberEt ? "/" + numberEt : ""))
        setTimeout(() => {
            newWindow.print()
        }, 500);
    }
    
    return (
        <div className={Style.contentBody}>
            <div className={Style.tittleModel}>
                <div></div>
                <h1>Se ha guardado la Ot</h1>
                <h1 onClick={() => { setResult() }}>
                    <CloseIcon sx={{cursor: "pointer"}}/>
                </h1>

            </div>
            <div className={Style.selectNumber}>
                <FormControl
                    sx={{ width: "20%", marginRight: "50px" }}
                >
                    <InputLabel id="demo-simple-select-label">N de etiquetas</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="N de etiquetas"
                        value={numberEt}
                        onChange={({ target: { value } }) => { setNumberEt(value) }}
                    >
                        {retornAllNumbers()}
                    </Select>
                </FormControl>
            </div>
            <div className={Style.buttons}>
                <Button color="success" variant="contained" onClick={() => { printPdf("Remito") }} >Imprimir Remito</Button>
                <Button color="success" variant="contained" onClick={() => { printPdf("Etiqueta", numberEt) }} >Imprimir Etiqueta</Button>
            </div>
        </div>
    );
}
const retornAllNumbers = () => {
    const items = [];
    for (let i = 0; i < 40; i++) {
        items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return items
}
export default ModalCallback;