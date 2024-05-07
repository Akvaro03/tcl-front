import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";

function SelectContact({ setData, defaultValue = "Ninguno" }) {
    const [contracts, setContracts] = useState()
    useEffect(() => {
        fetchAsyncUrl('/getContracts')
            .then(json => {
                let newJson = []
                json.forEach(element => {
                    let data = { label: element.name, id: element.id, url: element.url };
                    newJson.push(data)
                });
                newJson.unshift({ label: "Ninguno" })
                setContracts(newJson)
            })
    }, [])
    return (
        contracts && (
            <Autocomplete
                disablePortal
                disableClearable
                onChange={(event, newValue) => {
                    setData(newValue);
                }}
                defaultValue={{ label: defaultValue, id: "25555555", url: " " }}
                id="combo-box-demo"
                options={contracts}
                sx={{ width: "80%" }}
                renderInput={(params) => <TextField {...params} label="Contrato" />}
            />
        )
    );
}

export default SelectContact;