import MultipleSelect from "../../multipleSelect";
import { Box, TextField } from "@mui/material";
import OneSelect from "../../oneSelect";

function FilterOT({ filterOt, namesMultiple, count, setCount }) {
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
        <Box sx={{
            padding: "0 15px",
            width: "95%", background: "white", marginBottom: "15px",
            borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            display: "flex", alignItems: "center",
            
        }}>
            <TextField onChange={({ target }) => searchId(target.value)} sx={{ width: "100px" }} size="small" id="outlined-basic" label="Por ID" variant="outlined" />
            <OneSelect onchange={selectClient} factors={namesMultiple} label={"Por Cliente/s"} />
            <OneSelect factors={[...countOt, "Todos"]} onchange={setCount} value={count} label={"Max OT en pantalla"} />
        </Box>
    );
}
const countOt = [10, 50, 100]
export default FilterOT;
