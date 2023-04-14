import ResponsiveAppBar from "../../components/navbar";
import React from 'react';
import Style from './otPendingPage.module.css'
import ListOt from "./components/listOt";

function OtPendingPages() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOtPending}>
                <ListOt />
            </div>
        </>
    );
}

export default OtPendingPages;