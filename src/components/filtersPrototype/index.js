import { Box, TextField } from "@mui/material";
import MultipleSelect from "../multipleSelect";

export default function FilterPrototype({ search, select }) {
    return (
        <Box sx={{ height: "60px", padding: "0 15px", width: "95%", background: "white", marginBottom: "15px", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", alignItems: "center" }}>
            {search && (
                <TextField onChange={({ target }) => search.onChange(target.value)} sx={{ width: "100px" }} size="small" id="outlined-basic" label={search.label} variant="outlined" />
            )}
            {select.namesMultiple && (
                <MultipleSelect onchange={select.onChange} names={select.namesMultiple} label={"Por Cliente/s"} />
            )}
        </Box>
    ) 
} 