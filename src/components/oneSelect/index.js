import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function OneSelect({ factors, onchange, value, label }) {
    const change = ({ target }) => {
        onchange(target.value)
    }
    return (
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label} 
                onChange={change} 
            >
                {factors.map(data => (
                    <MenuItem key={data} value={data}>{data}</MenuItem>
                ))}
            </Select>
        </FormControl>);
}

export default OneSelect;