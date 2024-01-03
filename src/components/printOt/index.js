import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Style from "./printOt.module.css"
import getIp from "../../hooks/getIp";
import { useState } from "react";
import FormPrototype from "../formPrototype";

export default function PrintOt({ Result, close }) {
    const [numberEt, setNumberEt] = useState(2)
    const printPdf = (nameUrl, numberEt) => {
        window.open(`${getIp()}:3000/${nameUrl}/${Result}` + (numberEt ? "/" + numberEt : ""))
    }

    return (
        <FormPrototype tittle={"Imprimir"} close={close}>
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
                <Button variant="contained" onClick={() => { printPdf("Remito") }} >Imprimir Remito</Button>
                <Button variant="contained" onClick={() => { printPdf("ordentrabajo") }} >Imprimir Orden de trabajo</Button>
                <Button variant="contained" onClick={() => { printPdf("Etiqueta", numberEt) }} >Imprimir Etiqueta</Button>
            </div>
        </FormPrototype>
    );
}
const retornAllNumbers = () => {
    const items = [];
    for (let i = 0; i < 40; i++) {
        items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return items
}
