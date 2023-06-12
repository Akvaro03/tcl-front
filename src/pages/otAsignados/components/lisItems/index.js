import { Box, Button } from "@mui/material";
import Style from "./listItems.module.css"
import formatDateM from "../../../../hooks/formatDateM";

function ListItems({ Users, Ots }) {
    return (
        <div className={Style.contentListOt}>
            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                <Colum data={"Id"} />
                <Colum data={"Fecha"} />
                <Colum data={"Tipo"} />
                <Colum data={"Cliente"} />
                <Colum data={"Producto"} />
            </Box>
            {Ots && Ots[0] ? (
                Ots.map((OT, key) => (
                    JSON.parse(OT.Activities).map(activity => (
                        (
                            <div key={key} className={Style.ColumOt}>
                                <Colum data={OT.id} />
                                <Colum data={formatDateM(OT.Date)} />
                                <Colum data={OT.Type} />
                                <Colum data={OT.Client} />
                                <Colum data={OT.Producto} />
                                {OT.Auth === "0" ? (
                                    < Box sx={{ width: "13%", display: "flex", justifyContent: "center" }}>
                                        <Button>Autorizar OT</Button>
                                    </Box>
                                ) : false ? (
                                    <Box sx={{ width: "13%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>Falta asignar</h1>
                                    </Box>
                                ) : (
                                    <Box sx={{ width: "13%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>En Proceso</h1>
                                    </Box>
                                )}
                            </div>
                        )
                    ))
                ))
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                    <h1>No hay OT</h1>
                </Box>
            )
            }
        </div >
    );
}

const Colum = ({ data }) => {
    return (
        <Box sx={{ alignItems: "center", padding: "6px", width: "13%", display: "flex", justifyContent: "center" }}>
            {data}
        </Box>
    )
}
export default ListItems;