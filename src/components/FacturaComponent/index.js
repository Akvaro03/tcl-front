import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";

function FacturaComponent({ facturas }) {
    const rol = getUser("roles")
    if (!facturas && !permissions.editPay(rol)) return ""
    if (!facturas && permissions.editPay(rol)) return (
        <p>
            Agregar Factura
        </p>
    )

    return (
        <div>
            
        </div>
    );
}

export default FacturaComponent;