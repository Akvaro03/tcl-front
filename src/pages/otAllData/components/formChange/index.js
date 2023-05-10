import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import Style from './formChange.module.css'
import { Fade } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

function FormChange({ Change, CloseModal }) {
    const [NewChange, setNewChange] = useState([{ ...Change }])
    const handleChange = (event) => {
        const { target } = event;
        const copy = [...NewChange];
        if (target) {
            const { name, value } = target;
            copy[0][name] = value;
        } else {
            copy[0].date = new Date(event).getTime();
        }
        setNewChange(copy);
    };
    const handleSubmit = () => {
        // const resultChange = await postData('http://localhost:4000/editOtChanges', { Changes: DataHistory, idOt: DataState.idOt })
        console.log(NewChange[0])
    }
    return (
        <Fade style={{ animationDuration: 5000 }} in={isObject(Change)}>
            <div className={Style.FormCommitContent}>
                <div className={Style.HeaderForm}>
                    <p>Editar datos a subir</p>
                </div>
                <div className={Style.DataToSend}>
                    <div className={Style.TIttleCommit}>
                        <p>Titulo:</p>
                        <TextField
                            fullWidth
                            name='ChangeDescription'
                            onChange={handleChange}
                            value={NewChange[0].ChangeDescription}
                            sx={{ marginLeft: 2, height: 1 }}
                            id="outlined-multiline-flexible"
                        />
                    </div>
                    <div className={Style.Time}>
                        <p>Fecha: </p>
                        <div className={Style.TimeSelect}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name='date'
                                    onChange={handleChange}
                                    value={dayjs(NewChange[0].date)}
                                    format="DD/MM/YYYY"
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={Style.Comments}>
                        <p>Comentario:</p>
                        <TextField
                            value={NewChange[0].comment}
                            name='comment'
                            onChange={handleChange}
                            fullWidth
                            sx={{ marginTop: 1, height: 1 }}
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={3}
                        />
                    </div>
                </div>
                <div className={Style.Buttons}>
                    <div className={Style.Button}>
                        <Button variant="contained" onClick={CloseModal} color='error' fullWidth>Cancelar</Button>
                    </div>
                    <div className={Style.Button}>
                        <Button variant="contained" onClick={handleSubmit} color="success" fullWidth>Aceptar</Button>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

function isObject(str) {
    return typeof str === 'object';
}

export default FormChange;