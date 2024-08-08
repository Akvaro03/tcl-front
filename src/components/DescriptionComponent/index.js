import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";

function DescriptionComponent({ Description }) {
    const rol = getUser("roles")
    const isCanEdit = permissions.editPay(rol)
    console.log(Description)
    if (!Description && isCanEdit) {
        return "Agregar Detalles button"
    }

    if (!Description) {
        return ""
    }

    return <DescriptionData Description={Description} />
}

const DescriptionData = ({ Description }) => {
    return (
        Description.map((data, key) => (
            <div key={key}>
                {data.item}
                {data.Description}
                {data.import}
            </div>
        ))
    )
}

export default DescriptionComponent;