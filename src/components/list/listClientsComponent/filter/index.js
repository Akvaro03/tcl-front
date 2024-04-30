import Style from "./filterClientes.module.css"
import inputClass from "../../../../classes/inputClass";
import { Box } from "@mui/material";
import { useState } from "react"

export default function FilterClients({ filterData }) {
    const [id, setID] = useState("")
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const onChangeSearch = (data, type) => {
        const newData = type === "name" ? { id: "", name: data, code: "" } : type === "code" ? { id: "", name: "", code: data } : { id: data, name: "", code: "" }
        setID(newData.id)
        setName(newData.name)
        setCode(newData.code)
        filterData(data, type)
    }
    const inputFilter = new inputClass()
    return (
        <div className={Style.contentFilter}>
            <Box sx={{ width: "20%", marginLeft: "5%", display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "2%" }}>
                    <h1>ID:</h1>
                </Box>
                {inputFilter.getInput(id, (e) => onChangeSearch(e, "id"))}
            </Box>
            <Box sx={{ width: "20%", marginLeft: "5%", display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "2%" }}>
                    <h1>Nombre:</h1>
                </Box>
                {inputFilter.getInput(name, (e) => onChangeSearch(e, "name"))}
            </Box>
            <Box sx={{ width: "20%", marginLeft: "5%", display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "2%" }}>
                    <h1>Código:</h1>
                </Box>
                {inputFilter.getInput(code, (e) => onChangeSearch(e, "code"))}
            </Box>
        </div>
    )
}