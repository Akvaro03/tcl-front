import ResponsiveAppBar from "../../components/navbar";
import Style from './createOtPage.module.css'
import React from 'react';
import { Fade } from '@mui/material';
import TittleComponent from '../../components/tittleComponent';
import FormCreateOt from "./components/FormCreateOt";

function CreateOtPage() {

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <Fade in={true} >
                    <div className={Style.ContentCreateOt}>
                        <div className={Style.ContentTittle}>
                            <TittleComponent text={"Nueva OT"} />
                        </div>
                        <FormCreateOt />
                    </div>
                </Fade>
            </div>
        </>
    );
}
export default CreateOtPage;