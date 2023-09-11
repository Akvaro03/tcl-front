import changeUserTeam from "../../../db/changeUserTeam";
import Style from "./listUsersComponent.module.css"
import { Box, Button, Fade } from "@mui/material";
import FormSelectUser from "./formSelectUser";
import ModalPortal from "../../modelPortal";
import { useState } from "react";
export default function ListUsersComponent({ Users, reload, setEdit }) {
    const [isModalUser, setIsModalUser] = useState()
    const [userSelect, setUserSelect] = useState()
    const handleUsers = (userTeam) => {
        try {
            changeUserTeam({ id: userSelect.id, userTeam })
            setIsModalUser()
            reload()
        } catch (error) {
        }
    }
    return (
        <Fade in={true} >
            <div className={Style.contentListOt}>
                <Box sx={{ display: "flex", borderBottom: "1px solid #e5e7eb", width: "95%", height: "45px" }}>
                    <Colum data={"Id"} width="5%" />
                    <Colum data={"Nombre"} />
                    <Colum data={"Roles"} width="25%" />
                    <Colum data={"Email"} />
                    <Colum data={"Equipo"} width="40%" />
                </Box>
                {Users && Users[0] ? (
                    Users.map((Pay, key) => (
                        <div key={key} className={Style.ColumOt} onDoubleClick={() => setEdit(Pay)}>
                            <Colum state={Pay.state} data={Pay.id} width="5%" />
                            <Colum state={Pay.state} data={Pay.name} />
                            <Colum state={Pay.state} data={getRoles(Pay.type)} width="25%" />
                            <Colum state={Pay.state} data={Pay.email} />
                            <Colum state={Pay.state} data={<Button variant="text" onClick={() => {
                                setIsModalUser(true)
                                setUserSelect(Pay)
                            }}>{!JSON.parse(Pay.Team)[0] ? "Agregar Team" : JSON.parse(Pay.Team).join(", ")}</Button>}
                                width="40%" />
                        </div>
                    ))
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70%", fontSize: "25px" }}>
                        <h1>No hay Usuarios</h1>
                    </Box>
                )}
                {isModalUser && (
                    <ModalPortal type={"form"}>
                        <FormSelectUser closeForm={setIsModalUser} usersSelect={userSelect} handleUsers={handleUsers} />
                    </ModalPortal>
                )}
            </div>
        </Fade>
    );
}
const Colum = ({ data, width = "16%", state }) => (
    <Box sx={{ overflow: "hidden", alignItems: "center", padding: "6px", width, display: "flex", justifyContent: "center", color: state === "disable" ? "rgb(117 117 117)" : "initial" }}>
        {data}
    </Box>
);

const getRoles = (roles) => {
    return roles ? JSON.parse(roles).join(", ") : ""
}