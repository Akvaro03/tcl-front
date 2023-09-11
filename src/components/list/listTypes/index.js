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
            {listActivity && (
                <>
                    <Fade in={true}>
                        <div className={Style.contentListOt}>
                            <Box sx={{ display: "flex", fontSize: "20px", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px", justifyContent: "center" }}>
                                <Colum data={""} width="40%" />
                                <Colum data={"Lista de tipos de OT"} width="40%" />
                                <Colum data={<Button sx={{ color: "black" }}><CloseIcon /></Button>} onClick={() => close()} width="40%" />
                            </Box>
                            <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                                <Colum data={"Id"} width="10%" />
                                <Colum data={"Name"} />
                                <Colum data={"Actividades"} width="40%" />
                                <Colum data={"Abreviatura"} />
                            </Box>
                            {listActivity && listActivity[0] ? (
                                listActivity.map((OT, key) => (
                                    <div key={key} className={Style.ColumOt} onClick={() => setIsFormEditActivity(OT)}>
                                        <Colum data={OT.id} width="10%" />
                                        <Colum data={OT.nameType} />
                                        <Colum data={JSON.parse(OT.activities).map(data => data.name).join(", ")} width="40%" />
                                        <Colum data={OT.abbreviation} />
                                    </div>
                                ))
                            ) : (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px" }}>
                                    <h1>No hay OT</h1>
                                </Box>
                            )}
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
            setData(await getDataFromUrl("http://localhost:4000/getTypeOt"));
        }, 500);
    }
    setData(await getDataFromUrl("http://localhost:4000/getTypeOt"));
}

export default ListTypes;