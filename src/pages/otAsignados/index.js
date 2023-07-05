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
            {Ots && Ots[0] ? (
                format === "cards" ? (
                    <div className={Style.ContentAssing}>
                        <ListCards User={User} Ots={Ots} setUser={handleSetUser} />
                    </div>
                ) : (
                    <Box sx={{ width: "100%", height: "76vh", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <ListItems User={User} Ots={Ots} setOts={setOts} />
                    </Box>
                )
            ) : (
                <HandleNoOT />
            )}
        </>
    );
}
const filterByName = (json, name) => {
    return json.filter(ot => {
        const activities = JSON.parse(ot.Activities);
        return activities.filter(Activity => {
            const users = JSON.parse(Activity.users);
            if (Array.isArray(users)) {
                return users.includes(name);
            }
            return false;
        }).length > 0; // Agregué .length > 0 para que devuelva un resultado booleano
    });
};
const HandleNoOT = () => {
    return (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "70vh", fontSize: "35px" }}>
            No hay OT asignadas
        </Box>
    )
}
export default OtAsingPages;