import { DataGrid } from "@mui/x-data-grid";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import { useEffect, useState } from "react";
import Style from "./listUsers.module.css"
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'type', headerName: 'Tipo', width: 120 },
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
                .then(json => { jsonOts = json })
            getDataFromUrl('http://localhost:4000/getUsers')
                .then(json => {
                    getOts(json, jsonOts)
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
let getOts = (json, ots) => {
    json.forEach((user, index) => {
        let stringOt = "";
        if (user.otAssign !== null) {
            let otAssing = JSON.parse(user.otAssign).data;
            otAssing.forEach((numberOt, indexOt) => {
                stringOt += otAssing.length === indexOt + 1 ? numberOt : numberOt + ", "
            })
        } else {
            stringOt = "Ningun trabajo asignado"
        }
        json[index].otAssign = stringOt;
    });

    return json
}
export default ListUsers;