import { useState } from "react";
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import AddDescriptionComponent from "../addDescriptionComponent";
import ModalPortal from "../modelPortal";
import { Button } from "@mui/material";

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
    return <DescriptionData onClick={() => setIsAddDescription(true)} Description={Description} />
}

const DescriptionData = ({ Description, onClick }) => {
    return (
        <div style={{ display: "flex", width: "100%",flexDirection:"column" }}>
            {Description.map((data, key) => (
                <div onClick={onClick} key={key} style={{ cursor: "pointer", display: "flex", justifyContent: "space-evenly", width: "40%" }}>
                    <span>
                        {data.item ? data.item : "aa"}
                    </span>
                    <span>
                        {data.Description ? data.Description : "aa"}
                    </span>
                    <span>
                        {data.import ? data.import : "aa"}
                    </span>
                </div>
            ))
            }
        </div>
    )
}

export default DescriptionComponent;