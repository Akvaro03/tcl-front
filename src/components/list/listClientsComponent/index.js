import { Box, Fade } from "@mui/material";
import Style from "./listClientsComponent.module.css"
export default function ListClientsComponent({ Clients }) {
    return (
        <Fade in={true} >
            <div className={Style.contentListOt}>
                <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                    <Colum data={"Id"} width="10%" />
                    <Colum data={"Abreviatura"} width="10%" />
                    <Colum data={"Nombre"} />
                </Box>
                {Clients && Clients[0] ? (
                    Clients.map((Pay, key) => (
                        <div key={key} className={Style.ColumOt} >
                            <Colum data={Pay.id} width="10%" />
                            <Colum data={Pay.KeyUnique} width="10%" />
                            <Colum data={Pay.Name} />
                            <Colum data={Pay.businessName} />
                        </div>
                    ))
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70%", fontSize: "25px" }}>
                        <h1>No hay Cliente</h1>
                    </Box>
                )}
            </div>
        </Fade>
    );
}
const Colum = ({ data, width = "16%" }) => (
    <Box sx={{ alignItems: "center", padding: "6px", width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);