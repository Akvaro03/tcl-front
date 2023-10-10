import Style from "./listPrototype.module.css"
import { Box, Fade } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function ListPrototype({ header, list, clickable, recharge, Table, height }) {
    const [divHover, setDivHover] = useState(null)
    const [count, setCount] = useState(0)

    return (
        <Box component={"div"} position={"relative"} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", height: height ? height : "95%" }}>
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
                            list.slice((count * 20), ((count * 20) + 20)).map((data, key) => (
                                <div onMouseEnter={() => setDivHover(data.id)} onMouseLeave={() => setDivHover(null)} key={key} className={Style.ColumOt} onDoubleClick={() => clickable && clickable(data)}>
                                    <Table recharge={recharge} data={data} Colum={Colum} dataHover={divHover} />
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
            <Box position={"absolute"} display={"flex"} component={"div"} bgcolor={"#1976d2"} gap={"10px"} padding={"0 10px"} color={"#e5e7eb"} alignItems={"center"} height={"40px"} bottom={"-20px"} right={"5%"} borderRadius={"25px"} border={"1px solid black"}>
                <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => setCount(prev => prev === 0 ? 0 : prev - 1)}>
                    <ArrowBackIcon />
                </Box>
                <p>{`Pagina ${count + 1}`}</p>
                {count < ((list.length / 20) - 1) ? (
                    <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => setCount(prev => prev + 1)}>
                        <ArrowForwardIcon />
                    </Box>
                ) : (
                    <Box sx={{ visibility: "hidden" }}>
                        <ArrowForwardIcon />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

const Colum = ({ data, width = "13%" }) => (
    <Box key={"1"} sx={{ overflow: "hidden", alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);