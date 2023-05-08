import { DataGrid } from "@mui/x-data-grid";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import { useEffect, useState } from "react";
import Style from "./listUsers.module.css"
import resetTablet from "../../../../hooks/searchReplaceText";
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    {
        field: 'type', headerName: 'Tipo', width: 420, valueGetter: (params) =>
            `${params.row.type}`
    },
    {
        field: 'otAssign',
        headerName: 'Trabajos asignados', width: 200, valueGetter: (params) =>
            `${params.row.otAssign}`,
    }
];

function ListUsers() {
    const [Users, setUsers] = useState([{ id: 1, name: "", type: '' }])
    useEffect(() => {
        const getData = async () => {
            let jsonOts;
            await getDataFromUrl('http://localhost:4000/getOT')
                .then(json => { jsonOts = json ;})
            getDataFromUrl('http://localhost:4000/getUsers')
                .then(json => {
                    json = getOts(json, jsonOts)
                    resetTablet("No hay Usuarios")
                    setUsers(json)
                })

        }
        getData()
    }, [])

    return (
        <div className={Style.ContentListOt}>
            <div className={Style.DataGrid}>
                <DataGrid
                    sx={{ paddingLeft: 2 }}
                    rows={Users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
}

const getOts = (json) => {
    return json.map(user => {
        const otAssign = user.otAssign ? JSON.parse(user.otAssign).data.join(", ") : "Ningun trabajo asignado";
        const type = JSON.parse(user.type).join(", ");
        return { ...user, otAssign, type };
    })
};

export default ListUsers;