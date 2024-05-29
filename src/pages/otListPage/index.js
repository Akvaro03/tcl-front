import { FormControl, InputLabel, MenuItem, Select, Skeleton } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";
import Style from "./otListPage.module.css"
import useListOt from "../../hooks/useListOt";
import ListPrototype from "../../components/listPrototype";
import TableOT from "../../components/tables/TableOt";
import headerList from "../../classes/headerList";
import openNewTab from "../../hooks/openNewTab";
import ReplayIcon from '@mui/icons-material/Replay';
import { useState } from "react";

function OtListPage() {
    const { ot, reloadOT, allTypes, allClients, allStates } = useListOt()
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyList}>
                <Skeleton component={"div"}
                    sx={{ background: "grey", width: "15%", margin: "3vmin", height: "80vh", borderRadius: "10px", transform: "none " }}
                />
                <div className={Style.listOt}>
                    <div className={Style.filterAndTittle}>
                        <h3>OT List</h3>
                        <div className={Style.filters}>
                            <SelectFilter data={allTypes} handleChange={handleChange} label={"Por Tipo"} value={age} />
                            <SelectFilter data={allClients} minWidth="150px" handleChange={handleChange} label={"Por Cliente"} value={age} />
                            <SelectFilter data={allStates} minWidth="150px" handleChange={handleChange} label={"Por Estado"} value={age} />
                            <ReplayIcon />
                        </div>
                    </div>
                    {ot ? (
                        <ListPrototype
                            Table={TableOT}
                            header={headersOt.getHeader()}
                            list={ot}
                            clickable={(data) => openNewTab(`/events/${data.id}`)}
                            recharge={reloadOT}
                            height={"90%"} />
                    ) : (
                        <Skeleton component={"div"}
                            sx={{ background: "grey", height: "90%", borderRadius: "10px", transform: "none" }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}



const headersOt = new headerList()
headersOt.addHeader(" ", "3%")
headersOt.addHeader("ID", "15%")
headersOt.addHeader("Fecha", "9%")
headersOt.addHeader("Tipo", "13%")
headersOt.addHeader("Cliente", "15%")
headersOt.addHeader("Nombre Producto", "22%")
headersOt.addHeader("Estado", "15%")


const SelectFilter = ({ data, label, handleChange, value, minWidth = "100px" }) => (
    <FormControl size="small" sx={{ minWidth, margin: 0 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={handleChange}
        >
            {data.map((type, index) => (
                <MenuItem key={index} value={index}>{type}</MenuItem>
            ))}
        </Select>
    </FormControl>
)

export default OtListPage;