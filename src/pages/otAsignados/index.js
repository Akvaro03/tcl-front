import ResponsiveAppBar from "../../components/navbar";
import React from 'react';
import Style from './otAsignados.module.css'
// import ListAssing from "./components/listAssing";
import ListCards from "./components/listCards";
function OtAsingPages() {
    return (
        <>
            <ResponsiveAppBar /> 
            <div className={Style.ContentAssing}>
                {/* <ListAssing /> */}
                <ListCards />
            </div>
        </>
    );
}

export default OtAsingPages;