import ContentPay from "../../pages/otAllData/components/contentPay";
import permissions from "../../classes/permissions";
import Style from "./FacturaComponent.module.css"
import CircleButton from "../CircleButton";
import getUser from "../../hooks/getUser";
import { Button } from "@mui/material";
import OptionPay from "../../pages/otAllData/components/optionPay";
import useFacturaOT from "../../hooks/useFacturasOt";
import CircleFacturaButton from "./circleFacturaButton";

function FacturaComponent({ facturas = [], saveChanges }) {
    const { addPay, editPay, addFactura, deleteFactura, payFactura, editFactura, handleUi } = useFacturaOT(facturas ? facturas : [], saveChanges)
    const rol = getUser("roles")
    if (!facturas && !permissions.editPay(rol)) return ""
    if (!facturas && permissions.editPay(rol)) return (
        <div className={Style.bodyFacturas}>
            <Button size="small" variant="outlined"
                onClick={() => handleUi("add", true)}>Agregar Factura</Button>
            {addPay && (
                <ContentPay close={() => handleUi("add", false)} save={saveChanges} pay={facturas} saveList={addFactura} listPay={facturas} />
            )}
        </div>
    )
    return (
        <div className={Style.bodyFacturas}>
            <div className={Style.facturasButtons}>
                {facturas.map((data, key) => (
                    <CircleFacturaButton onClick={() => handleUi("edit", data)} key={key} data={data} />
                ))}
            </div>
            <Button size="small" variant="outlined"
                onClick={() => handleUi("add", true)}>Agregar Factura</Button>
            {addPay && (
                <ContentPay
                    close={() => handleUi("add", false)}
                    save={saveChanges}
                    pay={facturas}
                    saveList={addFactura}
                    listPay={facturas} />
            )}
            {editPay && (
                <OptionPay
                    pay={editPay}
                    close={() => handleUi("edit", false)}
                    deletePay={deleteFactura}
                    payFactura={payFactura}
                />
            )}
        </div>
    );
}

export default FacturaComponent;