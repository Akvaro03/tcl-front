import { useEffect, useState } from "react";
import ListOt from "../../components/listOt";
import ResponsiveAppBar from "../../components/navbar";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import Style from "./otPage.module.css"
function OtPage() {
    const [listOt, setListOt] = useState()
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getOT")
            .then(data => setListOt(data))
    }, [])

    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentOt}>
                <ListOt listOt={listOt} setListOt={setListOt} />
            </div>
        </>
    );
}

export default OtPage;