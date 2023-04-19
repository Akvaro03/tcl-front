import { useEffect, useState } from "react";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import { DataGrid } from "@mui/x-data-grid";
import formatDataToTable from "../../../../hooks/formatDataToTable";
import Style from './listAssing.module.css'
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'Date',
        type: 'Date', headerName: 'Fecha', width: 108, valueGetter: (params) =>
            `${new Date(params.row.Date).toLocaleDateString("en-GB")}`,
    },
    { field: 'Client', headerName: 'Cliente', width: 130 },
    { field: 'Type', headerName: 'Tipo', width: 120 },
    { field: 'Marca', headerName: 'Marca', width: 109 },
    { field: 'Modelo', headerName: 'Modelo', width: 116 },
    { field: 'Users', headerName: 'Users', width: 280 }
];

function ListAssing() {
    const [Ots, setOts] = useState([{ id: 1, Date: "", Client: '', Type: '', Marca: '', Modelo: "" }])
    const user = JSON.parse(JSON.parse(getUser()).userString);
    const nameUserLogin = user.name;

    useEffect(() => {
        const getData = async () => {
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    let jsonFiltered = filterData(json, nameUserLogin)
                    json = formatDataToTable(jsonFiltered, setOts)
                })
        }
        getData()
    }, [nameUserLogin])


    return (
        <div className={Style.ContentListOt}>
            <div className={Style.DataGrid}>
                <DataGrid
                    sx={{ paddingLeft: 2 }}
                    rows={Ots}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
}

const filterData = (json, name) => {
    let jsonFiltered = json.filter(ot => {
        if (ot.Users !== null) {
            let users = JSON.parse(ot.Users).data;
            let found = users.find(e => e === name)
            if (found === name) {
                return true
            }
        }
        return false
    })
    return jsonFiltered;
}
export default ListAssing;