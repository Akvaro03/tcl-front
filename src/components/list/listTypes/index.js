import getDataFromUrl from "../../../hooks/getDataFromUrl";
import FormCreateType from "../../forms/formCreateType";
import { Box, Button, Fade } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModalPortal from "../../modelPortal";
import { useEffect, useState } from "react";
import Style from "./listTypes.module.css"

function ListTypes({ menssage, close }) {
    const [isFormEditActivity, setIsFormEditActivity] = useState(false)
    const [listActivity, setListActivity] = useState()

    useEffect(() => {
        const setData = async () => {
            searchData(setListActivity)
        }
        setData()
    }, [])

    return (
        <Box component={"div"} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", height: "95%", justifyContent: "center" }}>
            {/* todo: No se cómo hacer para que se vea centrado horizontalmente en la pantalla y con las esquinas redondeadas */}
            {listActivity && (
                <>
                    <Fade in={true}>
                        <div className={Style.headerListOt}>
                            <Box sx={{ display: "flex", fontSize: "20px", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px", justifyContent: "center" }}>
                                <Colum data={""} width="40%" />
                                <Colum data={"Tipos de OT"} width="40%" />
                                <Colum data={<Button sx={{ color: "black" }}><CloseIcon /></Button>} onClick={() => close()} width="40%" />
                            </Box>
                            <Box sx={{ display: "flex", borderBottom: "3px solid #1976D2", width: "95%", height: "45px", fontWeight: "bold" }}>
                                <Colum data={"Nombre"} />
                                <Colum data={"Identificador"} />
                                <Colum data={"Actividades por defecto"} width="40%" />
                            </Box>
                            <div className={Style.contentListOt}>
                                {listActivity && listActivity[0] ? (
                                    listActivity.map((OT, key) => (
                                        <div key={key} className={Style.ColumOt} onDoubleClick={() => setIsFormEditActivity(OT)}>
                                            <Colum data={OT.nameType} />
                                            <Colum data={OT.abbreviation} />
                                            <Colum data={JSON.parse(OT.activities).map(data => data.name).join(", ")} width="40%" />
                                        </div>
                                    ))
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                                        <h1>No hay Tipos</h1>
                                    </Box>
                                )}
                            </div>
                        </div >
                    </Fade>
                </>
            )}
            {isFormEditActivity && (
                <ModalPortal type={"form"}>
                    <FormCreateType reload={() => searchData(setListActivity, true)} close={setIsFormEditActivity} menssage={menssage} data={isFormEditActivity} />
                </ModalPortal>
            )}
        </Box>
    );
}

const Colum = ({ data, width = "13%", onClick }) => (
    <Box onClick={onClick} sx={{ alignItems: "center", padding: "6px", width: width, display: "flex", justifyContent: "center" }}>
        {data}
    </Box>
);

const searchData = async (setData, isAwait) => {
    if (isAwait) {
        setTimeout(async () => {
            setData(await getDataFromUrl("/getTypeOt"));
        }, 700);
    }
    setData(await getDataFromUrl("/getTypeOt"));
}

export default ListTypes;