import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Fade, Skeleton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Style from "./listPrototype.module.css"
import { useEffect, useState } from "react";

export default function ListPrototype({ header, list, clickable, recharge, Table, height, close }) {
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
                            <ComponentSkeleton />
                        )}

                    </div>
                </div>
            </Fade>
            {close && (
                <Box onClick={() => close()} position={"absolute"} display={"flex"} component={"div"} bgcolor={"white"} gap={"10px"} padding={"0 10px"} color={"black"} sx={{ cursor: "pointer" }} cursor={"pointer"} alignItems={"center"} height={"40px"} top={"-20px"} right={"5%"} borderRadius={"25px"} border={"1px solid black"}>
                    <CloseIcon />
                </Box>
            )}
            <Box position={"absolute"} display={"flex"} component={"div"} bgcolor={"#1976d2"} gap={"10px"} padding={"0 10px"} color={"#e5e7eb"} alignItems={"center"} height={"40px"} bottom={"-20px"} right={"5%"} borderRadius={"25px"} border={"1px solid black"}>
                {count > 0 ? (
                    <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => setCount(prev => prev === 0 ? 0 : prev - 1)}>
                        <ArrowBackIcon />
                    </Box>
                ) : (
                    <Box sx={{ visibility: "hidden" }}>
                        <ArrowForwardIcon />
                    </Box>
                )}
                <p>{`Pagina ${count + 1}`}</p>
                {count < ((list.length / 20) - 1) ? (
                    <Box component={"div"} sx={{ cursor: "pointer" }} onClick={() => { setCount(prev => prev + 1) }}>
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
const ComponentSkeleton = () => {
    const [skeletons, setSkeletons] = useState([<Skeleton width={"90%"} height={"100%"} key={1} />, <Skeleton width={"90%"} height={"100%"} key={2} />, <Skeleton width={"90%"} height={"100%"} key={3} />, <Skeleton width={"90%"} height={"100%"} key={4} />, <Skeleton width={"90%"} height={"100%"} key={5} />, <Skeleton width={"90%"} height={"100%"} key={6} />, <Skeleton width={"90%"} height={"100%"} key={7} />])
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Cambiar el texto después de 1000 segundos (1 segundo)
            setSkeletons(<Box height={"100vh"} display={"flex"} alignItems={"center"}> No se encontraron OTs</Box>);
        }, 1000); // 1000 segundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente
    return skeletons
}
const Colum = ({ data, width = "13%", color }) => (
    <Box key={"1"} sx={{ width: width, color: color ? color : "black", alignItems: "center", padding: "6px", display: "flex", justifyContent: "center" }}>
        <Box component={"span"} sx={{ height: "100%", width: "100%", textAlignLast: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center" }} title={data}>
            {data}
        </Box>
    </Box>
);