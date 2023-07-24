import MultipleSelect from "../../multipleSelect";
import { Box, TextField } from "@mui/material";

function FilterOT({ filterOt, namesMultiple }) {
    const searchId = (id) => {
        if (id) {
            filterOt("searchId", id)
        } else {
            filterOt("searchId")
        }
    }
    const selectClient = (clients) => {
        filterOt("selectClient", clients)
    }
    return (
        <Box sx={{ height: "10%", padding: "0 15px", width: "95%", background: "white", marginBottom: "15px", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", alignItems: "center" }}>
            <TextField onChange={({ target }) => searchId(target.value)} sx={{ width: "100px" }} size="small" id="outlined-basic" label="Buscar Id" variant="outlined" />
            <MultipleSelect onchange={selectClient} names={namesMultiple} label={"Clientes seleccionados"} />
        </Box>
    );
}

export default FilterOT;