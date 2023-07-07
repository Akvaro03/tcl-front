import getUser from "../../../../hooks/getUser";
import { Box, Button } from "@mui/material";
import Style from "./filters.module.css"
function Filters({ filterOt, tag }) {
    const roles = getUser("roles")
    const Tag = ({ text }) => (
        <div className={tag === text ? Style.tagSelect : Style.tag} onClick={() => { filterOt(text) }}>
            <Button fullWidth>
                {text}
            </Button>
        </div>
    )
    return (
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", padding: "5% 0 5% 0", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", width: "10%", height: "80%", background: "white", margin: "15px", borderRadius: "15px" }}>
            <Tag text={"Todas"} />
            <Tag text={"En curso"} />
            <Tag text={"Asignar"} />
            <Tag text={"Autorizar"} />
            {roles.includes("Administrador") && (
                <Tag text={"Facturar"} />
            )}
        </Box>
    );
}

export default Filters;