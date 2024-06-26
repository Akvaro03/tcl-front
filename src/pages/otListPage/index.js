import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Skeleton } from "@mui/material";
import ListPrototype from "../../components/listPrototype";
import ResponsiveAppBar from "../../components/navbar";
import TableOT from "../../components/tables/TableOt";
import ReplayIcon from '@mui/icons-material/Replay';
import headerList from "../../classes/headerList";
import openNewTab from "../../hooks/openNewTab";
import useListOt from "../../hooks/useListOt";
import Style from "./otListPage.module.css"
import useListFactura from "../../hooks/useListFactura";
import TableFact from "../../components/tables/TableFact";
import ModalPortal from "../../components/modelPortal";
import FormPay from "../../components/forms/formPay";
import { useNavigate } from 'react-router-dom';

function OtListPage() {
    const { ot, filterValues, allTypes, allClients, allStates, allProduct, reloadOT, filterFacturaOt, filterClient, filterState, filterType, filterProduct } = useListOt()
    const { facturas, isFormated, allFactura, filterValueFactura, isEditFactura, handleIsEditFactura, reloadFactura, filterFactura, saveFactura } = useListFactura(ot)
    const resetAll = () => {
        reloadOT()
        reloadFactura()
    }
    const navigate = useNavigate()

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
                            <SelectFilter data={allProduct} handleChange={filterProduct} label={"Por Producto"} value={filterValues.product} minWidth="150px" />
                            <SelectFilter data={allFactura} handleChange={filterFactura} label={"Por Factura"} value={filterValueFactura} minWidth="150px" />
                            <FormControlLabel control={<Checkbox checked={filterValues.isNoFactura} onChange={filterFacturaOt} />} label="Sin Facturas" />
                            <ReplayIcon onClick={resetAll} />
                        </div>
                    </div>
                    {ot && filterValueFactura === "" ? (
                        <ListPrototype
                            Table={TableOT}
                            header={headersOt.getHeader()}
                            list={ot}
                            clickable={(data) => navigate(`/events/${data.id}`)}
                            recharge={reloadOT}
                            height={"90%"} />
                    ) : ot && isFormated ? (
                        <ListPrototype
                            Table={TableFact}
                            header={headersFact.getHeader()}
                            list={facturas}
                            clickable={(data) => handleIsEditFactura(data)}
                            recharge={resetAll}
                            height={"85%"} />
                    ) : (
                        <Skeleton component={"div"}
                            sx={{ background: "grey", height: "90%", borderRadius: "10px", transform: "none" }}
                        />
                    )}
                    {isEditFactura && (
                        <FormPay anotherSave={saveFactura} pay={isEditFactura} close={handleIsEditFactura} />
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

const headersFact = new headerList()
headersFact.addHeader("ID", "15%")
headersFact.addHeader("Creación", "9%")
headersFact.addHeader("Vencimiento", "20%")
headersFact.addHeader("Cobro", "15%")
headersFact.addHeader("OT relacionada", "35%")

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