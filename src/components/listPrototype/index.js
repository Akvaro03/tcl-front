import Style from "./listPrototype.module.css"
import { Box, Fade } from "@mui/material";
import { useState } from "react";
export default function ListPrototype({ header, list, clickable, recharge, Table, height }) {
    const [divHover, setDivHover] = useState(null)
    return (
        <Box component={"div"} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", height: height ? height : "95%" }}>
            <Fade in={true}>
                <div className={Style.ListOt}>
                    <Box sx={{ display: "flex", borderBottom: "3px solid #1976D2", width: "95%", height: "45px", fontWeight: "bold" }}>
                        {header && (
                            header.map((colum, key) => (
                                <Colum key={key} data={colum.name} width={colum.width} />
                            ))
                        )}
                    </Box>
                    <div className={Style.contentListOt}>
                        {list && list[0] ? (
                            list.slice(0, 20).map((data, key) => (
                                <div onMouseEnter={() => setDivHover(data.id)} onMouseLeave={() => setDivHover(null)} key={key} className={Style.ColumOt} onDoubleClick={() => clickable && clickable(data)}>
                                    <Table recharge={recharge} OT={data} Colum={Colum} otHover={divHover} />
                                </div>
                            ))
                        ) : (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                                <h1>No hay OT</h1>
                            </Box>
                        )}

                    </div>
                </div>
            </Fade>
        </Box>
    )
}

const Colum = ({ data, width = "13%" }) => (
    <Box key={"1"} sx={{ overflow: "hidden", alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);