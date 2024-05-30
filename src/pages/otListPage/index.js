import { FormControl, InputLabel, MenuItem, Select, Skeleton } from "@mui/material";
import ListPrototype from "../../components/listPrototype";
import ResponsiveAppBar from "../../components/navbar";
import TableOT from "../../components/tables/TableOt";
import ReplayIcon from '@mui/icons-material/Replay';
import headerList from "../../classes/headerList";
import openNewTab from "../../hooks/openNewTab";
import useListOt from "../../hooks/useListOt";
import Style from "./otListPage.module.css"

function OtListPage() {
    const { ot, reloadOT, filterValues, allTypes, allClients, allStates, filterClient, filterState, filterType } = useListOt()

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyList}>
                <div className={Style.listOt}>
                    <div className={Style.filterAndTittle}>
                        <h3>OT List</h3>
                        <div className={Style.filters}>
                            <SelectFilter data={allTypes} handleChange={filterType} label={"Por Tipo"} value={filterValues.Type} />
                            <SelectFilter data={allClients} handleChange={filterClient} label={"Por Cliente"} value={filterValues.Client} minWidth="150px" />
                            <SelectFilter data={allStates} handleChange={filterState} label={"Por Estado"} value={filterValues.state} minWidth="150px" />
                            <SelectFilter data={allStates} handleChange={filterState} label={"Por Estado"} value={filterValues.state} minWidth="150px" />
                            <SelectFilter data={allStates} handleChange={filterState} label={"Por Estado"} value={filterValues.state} minWidth="150px" />
                            <ReplayIcon onClick={reloadOT} />
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