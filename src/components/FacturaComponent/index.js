import permissions from "../../classes/permissions";
import Style from "./FacturaComponent.module.css"
import getUser from "../../hooks/getUser";
import { Button } from "@mui/material";
import useFacturaOT from "../../hooks/useFacturasOt";
import CircleFacturaButton from "./circleFacturaButton";
import OptionPay from "../optionPay";
import ContentPay from "../contentPay";

function FacturaComponent({ facturas = [], saveChanges }) {
    const { addPay, editPay, createFactura, addFactura, deleteFactura, payFactura, handleUi } = useFacturaOT(facturas ? facturas : [], saveChanges)
    const rol = getUser("roles")
    if (!facturas && !permissions.editPay(rol)) return ""
    if (!facturas && permissions.editPay(rol)) return (
        <div className={Style.bodyFacturas}>
            <Button size="small" variant="outlined"
                onClick={() => handleUi("add", true)}>Agregar Factura</Button>
            {addPay && (
                <ContentPay
                    nosenosenose={() => handleUi("add", false)}
                    close={() => handleUi("add", false)}
                    createFactura={(data) => createFactura(data)} pay={facturas}
                    addFactura={(data) => addFactura(data)} listPay={facturas} />
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
                    createFactura={createFactura}
                    close={() => handleUi("add", false)}
                    addFactura={addFactura}
                    listPay={facturas}
                />
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