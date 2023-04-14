import React, { useState } from 'react';
import Style from './createOtPage.module.css'
import ResponsiveAppBar from "../../components/navbar";
import FormCreateOt from "./components/form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function CreateOtPage() {
    const [Date, setDate] = useState(null)
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <div className={Style.ContentCreateOt}>
                    <div className={Style.ContentTittle}>
                        <div className={Style.ContentTime}>
                            <LocalizationProvider sx={{ height: 10 }} dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={Date} onChange={(newValue) => setDate(newValue)} />
                            </LocalizationProvider>
                        </div>
                        <p>Crear nuevas OT</p>
                    </div>
                    <FormCreateOt Date={Date} />
                </div>
            </div>
        </>
    );
}
export default CreateOtPage;