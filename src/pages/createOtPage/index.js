import React, { useState } from 'react';
import Style from './createOtPage.module.css'
import ResponsiveAppBar from "../../components/navbar";
import FormCreateOt from "./components/form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

function CreateOtPage() {
    const [DateForm, setDateForm] = useState(dayjs)

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <div className={Style.ContentCreateOt}>
                    <div className={Style.ContentTittle}>
                        <div className={Style.ContentTime}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={DateForm} onChange={(newValue) => setDateForm(newValue)} />
                            </LocalizationProvider>
                        </div>
                        <p>Crear nuevas OT</p>
                    </div>
                    <FormCreateOt DateCreate={DateForm} />
                </div>
            </div>
        </>
    );
}
export default CreateOtPage;