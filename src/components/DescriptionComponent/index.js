import { useState } from "react";
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import AddDescriptionComponent from "../addDescriptionComponent";
import ModalPortal from "../modelPortal";
import { Button } from "@mui/material";
import formatMoney from "../../hooks/formatMoney";

function DescriptionComponent({ Description, saveDescription }) {
    const [isAddDescription, setIsAddDescription] = useState(false)
    const rol = getUser("roles")
    const isCanEdit = permissions.editPay(rol)

    if (isAddDescription) return <ModalPortal type={"form"}><AddDescriptionComponent saveDescription={saveDescription} description={Description} close={setIsAddDescription} /></ModalPortal>

    if (!Description && isCanEdit) {
        return <Button variant="contained" onClick={() => setIsAddDescription(true)}>
            Agregar Descripción
        </Button>
    }

    if (!Description) {
        return ""
    }
    return <DescriptionData onClick={() => setIsAddDescription(true)} Description={Description} isCanEdit={isCanEdit} />
}

const DescriptionData = ({ Description, onClick, isCanEdit }) => (
    <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "1vmin" }}>
        {Description.map((data, key) => (
            <div onClick={isCanEdit ? onClick : undefined} key={key} style={{ cursor: isCanEdit ? "pointer" : undefined, display: "flex", justifyContent: "space-evenly", width: "60%" }}>
                <span style={{ width: "5vmin" }}>
                    {data.item ? data.item : ""}
                </span>
                <span style={{ width: "15vmin" }}>
                    {data.Description ? data.Description : ""}
                </span>
                <span style={{ width: "5vmin" }}>
                    {data.import ? formatMoney.format(data.import) : ""}
                </span>
            </div>
        ))
        }
    </div>
)

export default DescriptionComponent;