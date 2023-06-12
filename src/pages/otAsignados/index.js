import ResponsiveAppBar from "../../components/navbar";
import React, { useEffect, useState } from 'react';
import Style from './otAsignados.module.css'
import ListCards from "./components/listCards";
import SelectView from "./components/selectView";
import { Box } from "@mui/material";
import ListItems from "./components/lisItems";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import getUser from "../../hooks/getUser";
function OtAsingPages() {
    const [format, SetFormat] = useState("list")
    const [User, setUser] = useState()
    const [Ots, setOts] = useState()
    const handleSetUser = (newUser) => {
        setUser(newUser)
    }

    useEffect(() => {
        const getData = async () => {
            let user = getUser();
            setUser(getUser())
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = filterByName(json, user.name);
                    setOts(json.length > 0 ? json : null)
                })
        }
        getData()
    }, [])

    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", position: "fixed" }}>
                <SelectView SetFormat={SetFormat} format={format} />
            </Box>
            {Ots ? (
                format === "cards" ? (
                    <div className={Style.ContentAssing}>
                        <ListCards User={User} Ots={Ots} setUser={handleSetUser} />
                    </div>
                ) : (
                    <Box sx={{ width: "100%", height: "76vh", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <ListItems User={User} Ots={Ots} />
                    </Box>
                )
            ) : (
                <HandleNoOT />
            )}
        </>
    );
}
const filterByName = (json, name) => {
    return json.filter(ot =>
        JSON.parse(ot.Activities).every(Activity =>
            JSON.parse(Activity.users)
                .includes(name)))
}
const HandleNoOT = () => {
    setTimeout(() => {
        return <div className={Style.NoGrids}>
            No hay Ots asignadas
        </div>
    }, 2000);
}
export default OtAsingPages;