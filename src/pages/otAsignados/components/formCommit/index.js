import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Style from './formCommit.module.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import postData from '../../../../hooks/postData';

function FormCommit({ DataHistory, DataScore, DataState, setDataToSend, setUser }) {
    let handleSubmit = () => {
        DataHistory.Changes.date = new Date(DataHistory.Changes.date).getTime();
        setUser(DataScore)
        postData('http://localhost:4000/editScoreUser', DataScore)
        postData('http://localhost:4000/editOtState', DataState)
        postData('http://localhost:4000/editOtChanges', { Changes:DataHistory, idOt: DataState.idOt })
        setDataToSend()
    }

    return (
        <div className={Style.FormCommitContent}>
            <div className={Style.HeaderForm}>
                <p>Editar datos a subir</p>
            </div>
            <div className={Style.DataToSend}>
                <div className={Style.TIttleCommit}>
                    <p>Titulo: {DataHistory.Changes.ChangeDescription}</p>
                </div>
                <div className={Style.Time}>
                    <p>Fecha: </p>
                    <div className={Style.TimeSelect}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                defaultValue={dayjs}
                                format="DD/MM/YYYY"
                                onChange={value => DataHistory.Changes.date = value}
                                slotProps={{ textField: { size: 'small' } }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={Style.Comments}>
                    <p>Comentario:</p>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 1, height: 1 }}
                        id="outlined-multiline-flexible"
                        multiline
                        onChange={({ target: { value } }) => DataHistory.Changes.comment = value}
                        maxRows={3}
                    />
                </div>
            </div>
            <div className={Style.Buttons}>
                <div className={Style.Button}>
                    <Button variant="contained" onClick={() => { setDataToSend() }} color='error' fullWidth>Cancelar</Button>
                </div>
                <div className={Style.Button}>
                    <Button variant="contained" onClick={handleSubmit} color="success" fullWidth>Aceptar</Button>
                </div>
            </div>
        </div>
    );
}

export default FormCommit;