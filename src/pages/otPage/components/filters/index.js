import { Box, Button } from "@mui/material";

function Filters({ filterOt }) {
    const Tag = ({ text }) => (
        <Box component={"div"} onClick={() => { filterOt(text) }} sx={{ cursor: "pointer" }}>
            <Button fullWidth>
                {text}
            </Button>
        </Box>
    )
    return (
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", padding: "5% 0 5% 0", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", width: "10%", height: "80%", background: "white", margin: "15px", borderRadius: "15px" }}>
            <Tag text={"Todas"} />
            <Tag text={"En curso"} />
            <Tag text={"Asignar"} />
            <Tag text={"Autorizar"} />
        </Box>
    );
}


export default Filters;