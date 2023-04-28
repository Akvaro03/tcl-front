import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Style from './modalOt.module.css'
import postData from '../../../../hooks/postData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import History from '../history';
import { Button, StyledEngineProvider } from '@mui/material';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';


function ModalOt() {
    const [otSelected, setOtSelected] = useState({})
    const [isConfig, setIsConfig] = useState(false)
    let params = useParams();
    useEffect(() => {
        let getData = () => {
            postData('http://localhost:4000/getOneOt', { id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve))
                .then(resolve => setOtSelected(resolve))
        }
        getData();
    }, [params])
    function createData(calories, fat, carbs) {
        return { calories, fat, carbs };
    }

    const rows = [
        createData(6.0, 24, 4.0),
        createData(9.0, 37, 4.3),
        createData(16.0, 24, 6.0),
    ];

    return (
        <div className={Style.ModalOtContent}>
            <div className={Style.ModalDescriptionContent}>
                <div className={Style.ModelHeader}>
                    <p>{otSelected.id}</p>
                    <p className={Style.TittleModel}>{otSelected.Modelo}</p>
                    <p>{new Date(Date.parse(otSelected.Date)).toLocaleDateString("en-GB")}</p>
                </div>
                <div className={Style.ModalDescription}>
                    <div className={Style.DescriptionData}>
                        <p className={Style.Client}>{otSelected.Client}</p>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>Estado del Ot: </p>
                            <p><span className={Style.Property}>{otSelected.StateProcess}</span></p>
                        </div>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>Tipo de Ot: </p>
                            <p><span className={Style.Property}>{otSelected.Type}</span></p>
                        </div>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>Observaciones</p>
                            <p><span className={Style.Property}>{otSelected.Observations}</span></p>
                        </div>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>Usuarios Asignados: </p>
                            <p><span className={Style.Property}>{otSelected.Users}</span></p>
                        </div>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>Observaciones:</p>
                            <p><span className={Style.Property}>{otSelected.Observations}</span></p>
                        </div>
                        <div className={Style.ContentDescription}>
                            <p className={Style.nameProperty}>{`${otSelected.ContactType}: `}</p>
                            <p><span className={Style.Property}>{otSelected.ContactValue}</span></p>
                        </div>
                    </div>
                    <div className={Style.DescriptionTable}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Item</TableCell>
                                        <TableCell align="center">Descripcion</TableCell>
                                        <TableCell align="center">Importe</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, key) => (
                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div className={Style.ContentHistory}>
                <div className={Style.HistoryHeader}>
                    <p className={Style.TittleModel}>Historial</p>
                    <Button color='info' onClick={() => setIsConfig(!isConfig)} sx={{fontSize: 30, position: 'absolute', marginLeft: '20%', width: "8%" }} variant="outlined">
                        <ManageHistoryIcon/>
                    </Button>
                </div>
                <div className={Style.History}>
                    <StyledEngineProvider injectFirst>
                        <History isConfig={isConfig}/>
                    </StyledEngineProvider>
                </div>

            </div>
        </div>
    );
}

let formatData = (data) => {
    let UsersFormat = JSON.parse(data.Users)
    let stringUsers = "";
    UsersFormat.data.forEach((element, index) => {
        stringUsers += element;
        if (UsersFormat.data.length !== index + 1) {
            stringUsers += ", ";
        }
    });
    data.Users = stringUsers;

    let ContactFormat = JSON.parse(data.Contact)
    data.ContactType = ContactFormat.type
    data.ContactValue = ContactFormat.value
    return data
}

export default ModalOt;