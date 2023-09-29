import { Box, Fade } from "@mui/material";
import Style from "./listClientsComponent.module.css"
export default function ListClientsComponent({ Clients }) {
    return (
        <Fade in={true} >
            <div className={Style.headerListOt}>
                <Box sx={{ display: "flex", borderBottom: "3px solid #1976D2", width: "95%", height: "45px", fontWeight: "bold" }}>
                    <Colum data={"ID"} width="10%" />
                    <Colum data={"Abreviatura"} width="30%" />
                    <Colum data={"Nombre"} width="60%"/>
                </Box>

                <div className={Style.contentListOt}>
                    {Clients && Clients[0] ? (
                        Clients.map((Pay, key) => (
                            <div key={key} className={Style.ColumOt} >
                                <Colum data={Pay.id} width="10%" />
                                <Colum data={Pay.KeyUnique} width="30%" />
                                <Colum data={Pay.Name} width="60%"/>
                                {/* <Colum data={Pay.businessName} /> */}
                            </div>
                        ))
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70%", fontSize: "25px" }}>
                            <h1>No hay Cliente</h1>
                        </Box>
                    )}
                </div>
            </div>
        </Fade>
    );
}
const Colum = ({ data, width = "13%" }) => (
    // <Box sx={{ alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
    <Box sx={{ overflow: "hidden", alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);