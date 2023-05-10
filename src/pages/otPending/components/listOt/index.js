import Style from './listOt.module.css'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ListUsers from '../listUsers';
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import formatDataToTable from '../../../../hooks/formatDataToTable';
import resetTablet from '../../../../hooks/searchReplaceText';
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

function ListOt() {
    const [Ots, setOts] = useState([])
    const [Users, setUsers] = useState({})
    const [Open, setOpen] = useState(false)
    const [Closed, setClosed] = useState(true)
    const [SelectOt, setSelectOt] = useState()
    useEffect(() => {
        const getData = async () => {
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = formatDataToTable(json, setOts)
                    resetTablet("No hay Ots")
                })
            getDataFromUrl('http://localhost:4000/getUsers')
                .then(data => {
                    setUsers(data)
                })
        }
        getData()
    }, [])

    const handleEvent = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
    ) => {
        const target = event.target.getAttribute("data-field") || event.target.parentElement.getAttribute("data-field");

        if (target === "Users") {
            if (SelectOt === params.row.id || SelectOt === undefined) {
                setClosed(closed => !closed);
                setSelectOt(params.row.id);

                if (Open) {
                    setTimeout(() => setOpen(false), 500);
                } else {
                    setOpen(true);
                }
            } else {
                setSelectOt(params.row.id);
            }
        }
    };


    // const handleEvent = (
    //     params, // GridRowParams
    //     event, // MuiEvent<React.MouseEvent<HTMLElement>>
    //     details, // GridCallbackDetails
    // ) => {
    //     if (event.target.getAttribute("data-field") === "Users" || event.target.parentElement.getAttribute("data-field") === "Users") {
    //         if (SelectOt === params.row.id || SelectOt === undefined) {
    //             setClosed(!Closed)
    //             setSelectOt(params.row.id)
    //             if (Open === true) {
    //                 setTimeout(function () {
    //                     setOpen(!Open)
    //                 }, 500);
    //             } else {
    //                 setOpen(!Open)
    //             }
    //         } else {
    //             setSelectOt(params.row.id)
    //         }
    //     }
    // };

    return (
        <div className={Closed ? Style.ContentListOt : Style.ContentListOtMini}>
            <div className={Closed ? Style.DataGrid : Style.DataGridMini}>
                <DataGrid
                    onRowClick={handleEvent}
                    sx={{ paddingLeft: 2 }}
                    rows={Ots}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            {Open && (
                <div className={Closed ? Style.DatUsersClosed : Style.DatUsers}>
                    <ListUsers setOts={setOts} setUsers={setUsers} Closed={Closed} Users={Users} SelectOt={Ots[SelectOt - 1]} />
                </div>
            )}

        </div>
    );
}



export default ListOt;